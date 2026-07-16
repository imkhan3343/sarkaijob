"""Database utility for scraper."""
import sqlite3
import os
import uuid
from datetime import datetime, timezone
from typing import Optional


class DB:
    def __init__(self, db_path: Optional[str] = None):
        if db_path is None:
            db_path = os.path.join(
                os.path.dirname(os.path.dirname(os.path.dirname(__file__))),
                "prisma", "dev.db"
            )
        self.conn = sqlite3.connect(db_path)
        self.conn.row_factory = sqlite3.Row

    def fetch_all(self, query: str, params: tuple = ()) -> list[dict]:
        cursor = self.conn.execute(query, params)
        return [dict(row) for row in cursor.fetchall()]

    def fetch_one(self, query: str, params: tuple = ()) -> Optional[dict]:
        cursor = self.conn.execute(query, params)
        row = cursor.fetchone()
        return dict(row) if row else None

    def insert(self, table: str, data: dict) -> str:
        if not table.replace("_", "").isalnum():
            raise ValueError("Invalid table name")

        columns_info = {
            row[1]: row for row in self.conn.execute(f'PRAGMA table_info("{table}")')
        }
        if not columns_info:
            raise ValueError(f"Unknown table: {table}")

        data = dict(data)
        now = datetime.now(timezone.utc).isoformat()
        if "id" in columns_info and "id" not in data:
            data["id"] = uuid.uuid4().hex
        if "createdAt" in columns_info and "createdAt" not in data:
            data["createdAt"] = now
        if "updatedAt" in columns_info and "updatedAt" not in data:
            data["updatedAt"] = now

        unknown = set(data) - set(columns_info)
        if unknown:
            raise ValueError(f"Unknown columns for {table}: {sorted(unknown)}")

        columns = ", ".join(data.keys())
        placeholders = ", ".join(["?" for _ in data])
        values = list(data.values())
        cursor = self.conn.execute(
            f"INSERT INTO {table} ({columns}) VALUES ({placeholders})",
            values,
        )
        self.conn.commit()
        return str(data.get("id", cursor.lastrowid))

    def update(self, table: str, id: str, data: dict):
        if not table.replace("_", "").isalnum():
            raise ValueError("Invalid table name")
        data = dict(data)
        columns = {
            row[1] for row in self.conn.execute(f'PRAGMA table_info("{table}")')
        }
        if "updatedAt" in columns and "updatedAt" not in data:
            data["updatedAt"] = datetime.now(timezone.utc).isoformat()
        unknown = set(data) - columns
        if unknown:
            raise ValueError(f"Unknown columns for {table}: {sorted(unknown)}")
        sets = ", ".join([f"{k} = ?" for k in data.keys()])
        values = list(data.values()) + [id]
        self.conn.execute(f"UPDATE {table} SET {sets} WHERE id = ?", values)
        self.conn.commit()

    def close(self):
        self.conn.close()


_db_instance: Optional[DB] = None


def get_db() -> DB:
    global _db_instance
    if _db_instance is None:
        _db_instance = DB()
    return _db_instance
