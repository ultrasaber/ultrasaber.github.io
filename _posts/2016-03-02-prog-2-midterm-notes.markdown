---
layout: post
title: "Programming 2 Midterm Notes"
date: "2016-03-02 19:18:45 Central Standard Time"
categories: programming
---
Forms
-----

Modifying control properties
============================

* Control properties can be viewed and modified in the Properties window (View > Properties).
* Control properties may also be modified through code. They're just normal properties.

Opening forms in an MDI frame
=============================

* Forms can be simply shown by using the Form.Show() method.
* However, to get MDI child forms, we must set the MdiParent property to the parent form.

{% highlight cs %}
frmChildForm childForm = new frmChildForm();

// 'this', in this context, is the MDI frame.
childForm.MdiParent = this;
childForm.Show();
{% endhighlight %}

Opening a modal form
====================

* Instead of Form.Show(), use Form.ShowDialog().

Closing a form
==============

* Use the Form.Close() method.

App.config
----------

Creating and adding settings to an App.config file
==================================================

* Create an Application Configuration file within Visual Studio.
* App.config files use this syntax:

{% highlight xml %}
<configuration>
	<appSettings>
		<add key="keyName" value="value"/>
	</appSettings>
</configuration>
{% endhighlight %}

* This example will create a key/value pair of "keyName":"value".

Retrieving settings from an app.config file
===========================================

* Import System.Configuration with 'using'
* Refer to key/value pairs through ConfigurationManager.AppSettings["keyName"]
* Alternatively, use ConfigurationManager.AppSettings.Get("keyName")

Event Handling
--------------

Creating event handler methods
==============================

* Type "object.EventName +=" and just mash the TAB key until it works.
* I'm not even kidding, trust me.

Form validation
---------------

Validating controls using validation events
===========================================

* Controls have a Validating and Validated event.
* Validating is used to perform validation.
* Validated is executed whenever validation is finished.
* Setting e.Cancel to TRUE in Validating will prevent Validated from executing.
* Typically, Validated is used to remove previous errors that are shown.

Working with ErrorProvider
==========================

* errorProvider.SetError(control, errorMessage)
* Setting an error to an empty string will remove the error.

Unit Testing
------------

Creating unit test stubs
========================

* Right click your unit, then generate a unit test.

Coding unit tests
=================

* Set up your values to be used in the test.
* Construct your target object.
* Invoke the method that you're testing.
* Use Assert.AreEqual(expected, actual) (or other methods) to verify the result.

* You may need a private accessor to access private members in a class for testing.
* Just right click your class and create a private accessor.
* Refer to a private accessor by adding "_Accessor" to the name.

Business Tier Development
-------------------------

Understand and follow a Class Diagram
=====================================

* Don't tell me you don't know this.

Creating and coding classes
===========================

* You know methods already.
* Properties follow this structure:

{% highlight cs %}
public DataType PropertyName
{
	get
	{
		// code goes here
	}

	set
	{
		// more code goes here
	}
}
{% endhighlight %}

Adding references to projects
=============================

* Right click your project, then add a reference.
* Consult the documentation for things you may need to reference.
* Actually, just READ THE DOCUMENTATION. Period.

Using references in code
========================

* Use the 'using' keyword.

