(function ($) {
    "use strict";
    
    function Node(tag, title) {
        this.tag = tag;
        this.title = title;
        
        this.id = "";
        this.child = [];
        this.parent = null;
    }
    
    Node.prototype.addChild = function(node) {
        this.child.push(node);
        node.parent = this;
    }
    
    var list = [], current = null, prefix = 'heading-';
    
    function insertNode(current, node) {
        if (current === null) {
            node.id = prefix + (list.length + 1);
            list.push(node);
        } else if (current.tag < node.tag) {
            node.id = current.id + '-' + (current.child.length + 1);
            current.addChild(node);
        } else if (current.tag === node.tag) {
            if (current.parent === null) {
                node.id = prefix + (list.length + 1);
                list.push(node);
            } else {
                node.id = current.parent.id + "-" +
                            (current.parent.child.length + 1);
                current.parent.addChild(node);
            }
        } else {
            insertNode(current.parent, node);            
        }
    }

    $("#post").find("h1,h2,h3,h4,h5,h6").each(function() {
        var $this = $(this),
            node = new Node($this.prop("tagName"), $this.text());
        
        insertNode(current, node);
        
        $this.append("<span id='" + node.id + "'></span>");

        current = node;
    });
    
    function dump(arr) {
        var result = "";
        
        for (var i = 0; i < arr.length; i++) {
            result += "<li><a href='#" + arr[i].id + "'>" + 
                    arr[i].title + "</a>";
            
            if (arr[i].child.length > 0)
                result += "<ul>" + dump(arr[i].child) + "</ul>";
            
            result += "</li>";
        }
        
        return result;
    }
    
    $("#content-menu").append("<div><ul>" + dump(list) + "</ul></div>");

})(jQuery);
