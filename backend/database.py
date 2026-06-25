from sqlalchemy import create_engine

DATABASE_URL = "mysql+pymysql://root:Priyanka%401725@localhost/disaster_db"

engine = create_engine(
    DATABASE_URL,
    echo=True
)

print("MySQL Connected Successfully")