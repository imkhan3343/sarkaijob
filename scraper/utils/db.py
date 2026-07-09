"""Database utility for scraper."""
import sqlite3
import os
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

    def fetch_all(self, query: str) -> list[dict]:
        cursor = self.conn.execute(query)
        return [dict(row) for row in cursor.fetchall()]

    def fetch_one(self, query: str) -> Optional[dict]:
        cursor = self.conn.execute(query)
        row = cursor.fetchone()
        return dict(row) if row else None

    def insert(self, table: str, data: dict) -> str:
        columns = ", ".join(data.keys())
        placeholders = ", ".join(["?" for _ in data])
        values = list(data.values())
        cursor = self.conn.execute(
            f"INSERT INTO {table} ({columns}) VALUES ({placeholders})",
            values,
        )
        self.conn.commit()
        return str(cursor.lastrowid)

    def update(self, table: str, id: str, data: dict):
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
