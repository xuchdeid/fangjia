db.createUser(
    {
        user: "admin",
        pwd: "admin",
        roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
    }
);

db.createUser(
    {
      user: "app",
      pwd: "app",
      roles: [ { role: "readWrite", db: "app" } ]
    }
);
