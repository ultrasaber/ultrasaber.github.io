---
layout: "post"
title: "DBMS 2 Final Notes"
date: 2016-12-13
categories: dbms
---

This is the last stretch. Good luck, everyone.

Anonymous Blocks
----------------

Anonymous blocks typically follow this structure:

{% highlight sql %}
-- Example 'Hello World' block taken from http://www.oracle.com/technetwork/issue-archive/2011/11-mar/o21plsql-242570.html

DECLARE
  -- Used to declare working variables to use throughout the block.
  -- This clause is optional.
  l_message  VARCHAR2 (100) := 'Hello World!';
BEGIN
  -- Where all the magic happens.
  DBMS_OUTPUT.put_line(l_message);
END;
{% endhighlight %}

Stored Procedures and Functions
-----------------

Stored procedures and functions will typically follow this structure:

{% highlight sql %}
CREATE OR REPLACE PROCEDURE Extract_Check_Constraints(
  iTableName IN VARCHAR2 -- Parameter example.
)
AS
  -- Declare working variables and cursors here.
BEGIN
  -- Again, magic.
END;
/

-- For functions, a RETURN clause is required.
CREATE OR REPLACE FUNCTION Get_Constraint_Columns(
  iConstraintName VARCHAR2
)
RETURN VARCHAR2
AS
	...
	...
	...
{% endhighlight %}

Triggers
--------

{% highlight sql %}
-- Table trigger
CREATE OR REPLACE TRIGGER name
[AFTER|BEFORE] [INSERT|UPDATE|DELETE] ON table
BEGIN
  ...
END;
/

-- Row trigger
CREATE OR REPLACE TRIGGER name
[AFTER|BEFORE] [INSERT|UPDATE|DELETE] ON table
FOR EACH ROW
WHEN (NEW|OLD.attribute condition)
BEGIN
  ...
END;
/
{% endhighlight %}

Note that in row-level triggers, the data for the row being modifed/added/etc is accessible under the `:NEW` or `:OLD` object, depending on the context. This can assist in validation, or if you need to modify rows for any reason.

* Example: `:NEW.attribute := new_value`

Exceptions and Exception Processing
-----------------------------------

{% highlight sql %}
-- Declares new exception type and links it to the error code -20100.
-- Declare exception types in the AS or DECLARE clause of blocks.
INVALID_COLUMN_TYPE EXCEPTION;
PRAGMA EXCEPTION_INIT(INVALID_COLUMN_TYPE, -20100);

-- To throw the declared exception via error code, use this function
raise_application_error(-20100, 'ERROR MESSAGE');

-- Handle exceptions by including an EXCEPTION clause in your block.
BEGIN
  ...
EXCEPTION
  WHEN INVALID_COLUMN_TYPE THEN
    -- exception handling code goes here
END;
/
{% endhighlight %}

Coding Blocks Within Blocks
---------------------------

Anonymous blocks may be nested within blocks with no specific syntax changes. This can be useful when you want to continue execution after handling an exception, in which the nested block will act like a try/catch.

Cursors
-------

Automatic cursors are typically used like this:

{% highlight sql %}

-- Example of a cursor declared in an AS or DECLARE clause.
CURSOR UserColumns IS
  SELECT Column_Name, Data_Type, Data_Precision, Data_Length, Data_Scale, Data_Default, Nullable
  FROM User_Tab_Columns
  WHERE Table_Name=iTableName;
    
CurrentRow UserColumns%ROWTYPE; 

-- This cursor may be iterated through using a FOR loop.
FOR CurrentRow IN UserColumns
LOOP
  ...
END LOOP;

{% endhighlight %}

Manual cursor example:

{% highlight sql %}
DECLARE
  CURSOR Movies IS
    SELECT Name, RentalAmount
    FROM Movie
    WHERE MovieID < 10;

  wName CHAR(55); -- Variables to store column values in.
  wRentalAmount NUMBER(5,2);
BEGIN
  OPEN Movies;

  LOOP
  FETCH Movies INTO wName, wRentalAmount;
  EXIT WHEN Movies%NOTFOUND;
    DBMS_OUTPUT.PUT_LINE(wName || ' ' || wRentalAmount);
  END LOOP;

  CLOSE Movies;
END;
/
{% endhighlight %}

Parameters
----------

* `IN` - Acts as input for the procedure.
* `OUT` - Passes a value out of the procedure, i.e. the procedure is able to modify variables that are passed in.
* `IN OUT` - Goes both ways.

COMMIT and ROLLBACK
-------------------

* `COMMIT` - Makes permanent any changes made in the current transaction.
* `ROLLBACK` - Undoes changes made during the current transaction.

Other Things
------------

If you want to look at the exam notes from the midterm or from previous courses, here is a list of links:

* [DBMS 1 Midterm Exam Notes](http://ultrasaber.github.io/dbms/2016/02/28/dbms-midterm-notes.html)
* [DBMS 1 Final Exam Notes](http://ultrasaber.github.io/dbms/2016/04/24/dbms-final-notes.html)
* [DBMS 2 Midterm Exam Notes](http://ultrasaber.github.io/dbms/2016/10/17/dbms-2-midterm-notes.html)
