---
layout: post
menu: true
note: false
title: 'Rails Callbacks'
date: 2016-06-21 01:51
---

    (-) save
    (-) valid
    (1) before_validation
    (-) validate
    (2) after_validation
    (3) before_save
    (4) before_create
    (-) create
    (5) after_create
    (6) after_save
    (7) after_commit/after_rollback

``` ruby
class User < ActiveRecord::Base
  before_validation -> { puts "before_validation is called" }
  after_validation -> { puts "after_validation is called" }
  before_save -> { puts "before_save is called" }
  before_update -> { puts "before_update is called" }
  before_create -> { puts "before_create is called" }
  after_create -> { puts "after_create is called" }
  after_update -> { puts "after_update is called" }
  after_save -> { puts "after_save is called" }
  after_commit -> { puts "after_commit is called" }
end
```

```
> User.new.save
   (0.1ms)  begin transaction
before_validation is called
after_validation is called
before_save is called
before_create is called
  SQL (0.6ms)  INSERT INTO "users" ("created_at", "updated_at") VALUES (?, ?)  [["created_at", "2015-02-28 15:53:53.000058"], ["updated_at", "2015-02-28 15:53:53.000058"]]
after_create is called
after_save is called
   (485.3ms)  commit transaction
after_commit is called
 => true
```

```
> user.update(name: "toshi")
   (0.1ms)  begin transaction
before_validation is called
after_validation is called
before_save is called
before_update is called
  SQL (0.3ms)  UPDATE "users" SET "name" = ?, "updated_at" = ? WHERE "users"."id" = ?  [["name", "toshi"], ["updated_at", "2016-01-21 08:04:19.290079"], ["id", 1]]
after_update is called
after_save is called
    (2.5ms)  commit transaction
after_commit is called
=> true
```

The entire callback chain of a save, save!, or destroy call runs within a transaction. That includes after_* hooks. If everything goes fine a COMMIT is executed once the chain has been completed.

http://api.rubyonrails.org/classes/ActiveRecord/Callbacks.html
http://guides.rubyonrails.org/active_record_callbacks.html

http://blog.toshimaru.net/active-record-callbacks/
