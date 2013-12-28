---
layout: post
menu: true
note: true
published: true
title: 'Learning Vimscript'
date: 2013-12-24 08:22:50
tags: Vim Vimscript
categories: Vim
---

Notes taken from reading [Learn Vimscript the Hard Way](http://learnvimscriptthehardway.stevelosh.com/).

## Persistent Echoing

Using `:echom` will save the output and let you run `:messages` to view it later.

## Setting Options

There are two main kinds of options:

- boolean options (either "on" or "off"):
  * `:set <name>` turns the option on and `:set no<name>` turns it off.
  * `:set <name>!` to toggle a boolean option.
- options that take a value:
  * change non-boolean options with `:set <name>=<value>`,

You can ask Vim what an option is currently set to by `:set <name>?`.

## Mappings

- `map, nmap, vmap, and imap` to create key mappings.
- Each of the map commands has a `*noremap` counterpart that
  ignores other mappings: `noremap, nnoremap, vnoremap, and inoremap`.
- `*unmap` commands remove the mapping for the modes.

## Autocommands

Autocommands are a way to tell Vim to run certain commands whenever certain events happen.

{% highlight vim %}
:autocmd BufNewFile * :write
         ^          ^ ^
         |          | |
         |          | The command to run.
         |          |
         |          A "pattern" to filter the event.
         |
         The "event" to watch for.
{% endhighlight %}

Vim offers many events to watch, `:help autocommand-events`.

E.g.:

{% highlight vim %}
:autocmd BufNewFile,BufRead *.html setlocal nowrap
:autocmd FileType python nnoremap <buffer]]> <localleader]]>c I#<esc]]>
{% endhighlight %}

- `BufNewFile` starting to edit a file that doesn't exist
- `BufRead` starting to edit a new buffer, after reading the file
- `FileType` when the filetype option has been set

### Grouping Autocommands

Clear an autocommands group uses `autocmd!` inside the group:

{% highlight vim %}
augroup filetype_html
    autocmd!
    autocmd FileType html nnoremap <buffer]]> <localleader]]>f Vatzf
augroup END
{% endhighlight %}

### Local Abbreviations

{% highlight vim %}
:iabbrev <buffer> --- &mdash;
:autocmd FileType python     :iabbrev <buffer> iff if:<left>
:autocmd FileType javascript :iabbrev <buffer> iff if ()<left>
{% endhighlight %}

## Variables

{% highlight vim %}
:let foo = “bar"
" read and set options as variables
:set textwidth=80
" the same as above one
:let &textwidth = 100
:let &textwidth = &textwidth + 10
{% endhighlight %}

Vim treats the integer `0` as `false` and the integer `1` as `true`.

### Local Options

Set a local option as a variable using prefix: `:let &l:number = 1`.

### Registers as Variables

- Set registers as variables: `:let @a = "hello!"`.
- Registers can also be read: `:echo @a`.
- When yank (`y`), yanked value is stored in `"` register: `:echo @"`.
- When search ('/'), search command is stored in `/` register: `:echo @/`.

### Variable Scoping

When we used `b:` in the variable name we told Vim that
the variable `hello` should be local to the current buffer: `:let b:hello = "world"`.

## Conditionals

- Can separate each line with a pipe character (`|`).

### If Condition

- Integer `0` is `false`.
- Vim does not necessarily treat a non-empty string as `true`:
  - Strings that start with a number are coerced to that number;
  - Otherwise they're coerced to 0.

{% highlight vim %}
if 0
    echom "if"
elseif "nope!"
    echom "elseif"
else
    echom "finally!"
endif
=> finally!
{% endhighlight %}

### Case Sensitivity

The behavior of `==` depends on a user's settings.

{% highlight vim %}
set noignorecase
if "foo" == "FOO"
    echom "vim is case insensitive"
elseif "foo" == "foo"
    echom "vim is case sensitive"
endif
" => vim is case sensitive

set ignorecase
if "foo" == "FOO"
    echom "no, it couldn't be"
elseif "foo" == "foo"
    echom "this must be the one"
endif
" => no, it couldn't be
{% endhighlight %}

A bare `==` should never appear in your plugins' code.
**Use the case-insensitive `==?` or the case-sensitive `==#`.**
You should always use explicit case sensitive or insensitive comparisons.

## Functions

Vimscript functions must start with a **capital letter** if they are unscoped!
If a function doesn't return a value, it implicitly returns 0.

{% highlight vim %}
function TextwidthIsTooWide()
  if &l:textwidth ># 80
    return 1
  endif
endfunction
{% endhighlight %}

### Function Arguments

When you write a Vimscript function that takes arguments
you always need to prefix those arguments with `a:` to tell Vim that
they're in the argument scope.

{% highlight vim %}
function DisplayName(name)
  echom "Hello!  My name is:"
  echom a:name
endfunction
{% endhighlight %}

_Note:_ you can't reassign argument variables

## Strings

Vim's `+` operator is only for Numbers.  When you pass a string to `+`,
Vim will try to coerce it to a number before performing the addition.

{% highlight vim %}
:echom "Hello, " + "world"
=> 0
:echom 10 + "10.10"
=> 20
{% endhighlight %}

Use `.` to concatenate strings: `:echom "Hello, " . "world"`

Using _single quotes_ tells Vim that you want the string exactly as-is,
with no escape sequences.

### String Functions

- length: `strlen("foo")` or `len("foo")`.
- splitting: `split("one two three")` or `split("one,two,three", ",")`.
- joining: `join(["foo", "bar"], "...")`.
- casing: `tolower("Foo")` and `toupper("Foo")`.

## Execute

The `execute` command evaluate a string as if it were a Vimscript command.

## Normal

The `normal` command takes a sequence of keys as typed in normal mode.

- The `normal` command will take into account any mappings that exist.
  **So always use `normal!` command to avoid mappings.**
- The `normal!` command doesn't parse special character sequences like `<cr>`.
  Combining `normal!` with `execute` fixes that problem.

{% highlight vim %}
:execute "normal! gg/foo\<cr>dd"
{% endhighlight %}

## Regular Expressions

- Read `:help magic`.
- Read `:help match`.

## Lists

- Vimscript lists are ordered, heterogeneous collections of elements:
  `['foo', 3, 'bar']`.
- The index `-1` refers to the last element in the list,
  `-2` is the second-to-last, and so on.
- Slicing `['a', 'b', 'c', 'd', 'e'][0:2] => ['a', 'b', 'c']`
- Slice indexes can be negative: `['a', 'b', 'c', 'd', 'e'][-2:-1] => ['d', 'e']`
- Concatenate with `+`: `['a', 'b'] + ['c'] => ['a', 'b', 'c']`

### List Functions

- `add(foo, 'b')` mutates the list `foo` in-place to append `'b'`.
- `len(foo)` returns the length of the list.
- `get(foo, 100, 'default')` get the item at the given index, or
  return the given default value if the index is out of range in the list.
- `index(foo, 'b')` returns the first index of the given item, `-1` if not found.
- `join([1, 2, 3], ',')` returns `1,2,3`
- `reverse(foo)` reverses the given list **in place**.

## Looping

### For Loops

{% highlight vim %}
for i in [1, 2, 3, 4]
  let c += i
endfor
{% endhighlight %}

### While Loops

{% highlight vim %}
while c <= 4
  let total += c
  let c += 1
endwhile
{% endhighlight %}

## Dictionaries

Vimscript dictionaries are similar to Javascript's objects.

Dictionaries are created using curly brackets.
Values are heterogeneous, but _keys are always coerced to strings_.

Vimscript also supports the Javascript-style "dot" lookup when
the key is a string consisting only of letters, digits and/or underscores.

{% highlight vim %}
:echo {'a': 1, 100: 'foo',}['a']
:echo {'a': 1, 100: 'foo',}.a
:echo {'a': 1, 100: 'foo',}[100]
:echo {'a': 1, 100: 'foo',}.100
{% endhighlight %}

### Dictionary Functions

- `let test = remove(foo, 'a')` and `unlet foo.b` remove entries from a dictionary.
- `get({'a': 100}, 'a', 'default')`.
- `has_key({'a': 100}, 'a')` returns `1` or `0`.

## Toggling

- For boolean options we can use set `someoption!` to "toggle" the option.

{% highlight vim %}
nnoremap <leader>q :call QuickfixToggle()<cr>

let g:quickfix_is_open = 0

function! QuickfixToggle()
    if g:quickfix_is_open
        cclose
        let g:quickfix_is_open = 0
        execute g:quickfix_return_to_window . "wincmd w"
    else
        let g:quickfix_return_to_window = winnr()
        copen
        let g:quickfix_is_open = 1
    endif
endfunction
{% endhighlight %}

## Functional Programming

Vimscript supports using variables to store functions: `let Myfunc = function("sort")`

## Paths

{% highlight vim %}
# % means "the current file"
:echom expand('%')
# :p tells Vim that you want the absolute path
:echom expand('%:p')
# an absolute path to the file foo.txt in the current directory
# regardless of whether that file actually exists
:echom fnamemodify('foo.txt', ':p')
{% endhighlight %}

## Plugin

### Folder Structure

Directory        | Description
---              | ---
~/.vim/colors/   | color schemes
~/.vim/plugin/   | run once every time Vim starts
~/.vim/ftdetect/ | autocommands that detect and set the filetype of files
~/.vim/ftplugin/ | `filetype` named files
~/.vim/indent/   | indentation
~/.vim/compiler/ | set compiler-related options in the current buffer based on their names
~/.vim/after/    | loaded every time Vim starts, but after the files in `~/.vim/plugin/`
~/.vim/autoload/ | delay the loading of your plugin's code until it's actually needed
~/.vim/doc/      | documentation
