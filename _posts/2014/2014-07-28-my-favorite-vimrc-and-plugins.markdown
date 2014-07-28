---
layout: post
menu: true
published: true
title: 'My favourite Vim plugins'
date: 2014-07-28 14:32:43
tags: Vim
categories: Vim
---

A collection of my favourite Vim plugins and configurations.

### [Shougo/neobundle.vim](https://github.com/Shougo/neobundle.vim)

A next generation Vim plugin manager.

### [AndrewRadev/switch.vim](https://github.com/AndrewRadev/switch.vim)

Switch segments of text with predefined replacements.

### [bling/vim-airline](https://github.com/bling/vim-airline)

Nice and useful status/tabline for Vim.

### [jiangmiao/auto-pairs](https://github.com/jiangmiao/auto-pairs)

Insert or delete brackets, parenthesis, quotes in pair.

### [Lokaltog/vim-easymotion](https://github.com/Lokaltog/vim-easymotion)

Move inside Vim freely.

### [scrooloose/syntastic](https://github.com/scrooloose/syntastic)

Syntax checking hacks for Vim.

### [scrooloose/nerdtree](https://github.com/scrooloose/nerdtree)

A tree explorer plugin for Vim.

### [Shougo/unite.vim](https://github.com/Shougo/unite.vim)

Unite and create user interfaces.

{% highlight vim %}
" File switching, start in insert mode
nnoremap <silent> <D-p> :<C-u>Unite -start-insert file_rec/async:!<CR>
" Buffer switching
nnoremap <silent> <D-u> :<C-u>Unite -quick-match buffer<CR>
" Tab switching
nnoremap <silent> <C-t> :<C-u>Unite -quick-match buffer tab<CR>

" Enabled to track yank history
let g:unite_source_history_yank_enable = 1
let g:unite_source_history_yank_save_clipboard = 1
" Yank history like YankRing
nnoremap <silent> <D-y> :<C-u>Unite history/yank<CR>

" Open most recent files
" Require Shougo/neomru.vim
nnoremap <silent> <D-o> :<C-u>Unite file_mru<CR>
{% endhighlight %}

### [Shougo/neocomplete.vim](https://github.com/Shougo/neocomplete.vim)

Powerful keyword completion plugin.

### [Shougo/neosnippet.vim](https://github.com/Shougo/neosnippet.vim)

Adds snippet support to Vim.

### [tpope/vim-commentary](https://github.com/tpope/vim-commentary)

Toggling comments in Vim.

### [tpope/vim-surround](https://github.com/tpope/vim-surround)

Provides mappings to easily delete, change and add such surroundings in pairs.

{% highlight vim %}
xmap ( S)
xmap { S{
xmap [ S]
xmap " S"
xmap ' S'
xmap ` S`
xmap T St
{% endhighlight %}

### [tpope/vim-repeat](https://github.com/tpope/vim-repeat)

Enable repeating supported plugin maps with ".".

### [tpope/vim-vinegar](https://github.com/tpope/vim-vinegar)

Press `-` in any buffer to hop up to the directory listing.

### [terryma/vim-expand-region](https://github.com/terryma/vim-expand-region)

Allows you to visually select increasingly larger regions of text using the same key combination.

{% highlight vim %}
vmap v <Plug>(expand_region_expand)
vmap <C-v> <Plug>(expand_region_shrink)
{% endhighlight %}

### [tyru/open-browser.vim](https://github.com/tyru/open-browser.vim)

Open link under cursor in browser.

### [kris89/vim-multiple-cursors](https://github.com/kris89/vim-multiple-cursors)

Add true Sublime Text style multiple selections for Vim.

{% highlight vim %}
" To work with neocomplete
function! Multiple_cursors_before()
    exe 'NeoCompleteLock'
endfunction
function! Multiple_cursors_after()
    exe 'NeoCompleteUnlock'
endfunction
{% endhighlight %}

### Color schemes

- [chriskempson/base16-vim](https://github.com/chriskempson/base16-vim)
- [morhetz/gruvbox](https://github.com/morhetz/gruvbox)
- [sjl/badwolf](https://github.com/sjl/badwolf)

### More

More great plugins can be found in my [`.vimrc`](https://github.com/zhuochun/dotfiles/blob/master/vimrc).
