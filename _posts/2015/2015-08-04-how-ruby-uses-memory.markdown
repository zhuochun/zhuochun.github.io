---
layout: post
title: "How Ruby uses Memory"
date: "2015-08-04 00:05"
---

- **Object Retention**
  - Constants: Constants in Ruby are never garbage collected so if a constant has a reference to an object, then that object can never be garbage collected. This goes for constants, global variables, modules, and classes. It’s important to be careful referencing objects from anything that is globally accessible.

Benchmark Memory Consumptions with `GC.stat(:total_freed_objects)` it will return the number of objects that have been released by Ruby

``` ruby
GC.start
before = GC.stat(:total_freed_objects)

RETAINED = []
100_000.times do
  RETAINED << "a string"
end

GC.start
after = GC.stat(:total_freed_objects)
puts "Objects Freed: #{after - before}"
```

https://github.com/schneems/get_process_mem

## References

- http://www.schneems.com/2015/05/11/how-ruby-uses-memory.html
- http://www.sitepoint.com/ruby-uses-memory/
