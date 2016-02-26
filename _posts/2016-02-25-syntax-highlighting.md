---
layout: post
title: "Syntax highlighting"
date: 2016-02-25 13:45:01 -0600
categories: meta
---
We need some code up in here. One second...

{% highlight js %}
var fs = require("fs");
var path = require("path");

function listDirectory () {
	fs.readdir(process.argv[2], function doneReading (err, list) {
		for (i = 0; i < list.length; i++) { // Can use array.forEach() to run this code.
			if (path.extname(list[i]) === "." + process.argv[3]) {
				console.log(list[i]);
			}
		}
	});
}

listDirectory();
{% endhighlight %}

Neato.
