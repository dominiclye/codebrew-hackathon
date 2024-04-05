import os

# Assuming the database is in the current working directory
if os.path.exists('mydatabase.db'):
    os.remove('mydatabase.db')
    print("Database removed.")
else:
    print("The database does not exist.")