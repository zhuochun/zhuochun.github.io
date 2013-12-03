---
layout: post
published: true
title: 'Unmap default menu bindings in MacVim'
date: 2013-11-30 20:34:45
tags: Vim MacVim Mac
categories: Vim
---

In MacVim, the `Command` key has default menu bindings (e.g. `<D-o>` is mapped to _Open File_). Sadly, these mappings cannot be overwritten directly through `.vimrc`.

Here is the trick to unmap the unwanted `<D->` bindings. Put the snippet in `.gvimrc`:

{% highlight vim %}
if has("mac")
    " Unmap Commnd + t
    macmenu File.New\ Tab key=<nop>
    " Unmap Commnd + o
    macmenu File.Open\.\.\. key=<nop>
    " Unmap Commnd + T
    macmenu File.Open\ Tab\.\.\. key=<nop>
    " Unmap Commnd + p
    macmenu File.Print key=<nop>
    " Unmap Commnd + f
    macmenu Edit.Find.Find\.\.\. key=<nop>
endif
{% endhighlight %}

Additionally, to enable `Alt`/`<M->` key mappings on MacVim (in `.vimrc`):

{% highlight vim %}
if has("gui_macvim")
  set macmeta
endif
{% endhighlight %}

**References**

- [My Vim Settings](https://github.com/zhuochun/dotfiles)
