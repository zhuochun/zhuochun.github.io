---
layout: "post"
title: "Taste of Golang"
date: "2016-04-03 21:19"
---

Slice 的存在只是因为 Array 是 pass by value，所以传递时很费内存。而为了推出 slices，却加了很多只为 slices 设计的 build-in functions: cap, append.

> A weakness of Go is that any generic-type operations must be provided by the run-time. Some day that may change, but for now, to make working with slices easier, Go provides a built-in generic append function. It works the same as our int slice version, but for any slice type.

一边说 go 不需要 generics，但是自己需要的时候就创建 build-in functions。

https://blog.golang.org/slices

同样的，map[] 的 return 是和别的设计不 consistent 的

> An attempt to fetch a map value with a key that is not present in the map will return the zero value for the type of the entries in the map.

``` go
attended := map[string]bool{
    "Ann": true,
    "Joe": true
}

att := attended["unknown"] // false as default
att, ok := attended["unknown"] // ok is false, att is nil
```
