---
layout: "post"
title: "DBMS Final Notes"
date: 2016-04-24
categories: dbms
---
Here we go again. These notes are based off of the final exam study guide.

Lecture 10: Updates and Transactions
====================================

Know the syntax for INSERT, UPDATE and DELETE.
----------------------------------------------

{% highlight sql %}
-- INSERT command syntax
INSERT INTO TableName (Column1, Column2, ...)
VALUES (Value1, Value2, ...);

-- UPDATE command syntax
UPDATE TableName
SET Column1 = Value1,
    Column2 = Value2,
    ...
WHERE condition;

-- DELETE command syntax
DELETE FROM TableName
WHERE condition;
{% endhighlight %}

Updating values to NULL
-----------------------

* Literally just specify `NULL` when you assign the value. I don't know why this is a bullet point.

What is a transaction?
----------------------

* It's a sequence of one or more SQL statements that form a logical unit of work.

What is DML?
------------

* Data Manipulation Language.
* Commands used to `SELECT`, `INSERT`, `UPDATE`, and `DELETE` data in a database.
* Not to be confused with DDL, which handles the structure of data in a database.

Why isn't INSERT a transaction by itself?
-----------------------------------------

* I actually can't find an answer for this.
* Might be with how the ANSI/ISO transaction model works. Since we can configure our environment to not automatically `COMMIT` statements, can an `INSERT` technically not be a transaction?
* Ask someone else.

Speaking of the ANSI/ISO model...
---------------------------------

* The ANSI/ISO transaction model automatically starts transactions for you, and `COMMIT`s once the program has completed/you issue a `COMMIT` yourself.
* Non-ANSI/ISO transaction models require you to explicitly `BEGIN TRANSACTION`s. Otherwise, each statement will be `COMMIT`ted automatically.

On CURRENT_DATE
---------------

* It's a constant representing the current date.
* You use it when you want the current date.

On INSERT
---------

* You don't have to specify all of the columns when inserting rows.
* Any column not specified will be set to `NULL`.

Lecture 11: Views
=================

View Syntax
-----------

{% highlight sql %}
CREATE VIEW ViewName AS
  [put SELECT here];
{% endhighlight %}

But what's a view?
------------------

* Basically virtual tables that don't actually contain data.
* In fact, it's just a `SELECT` that acts like a table.

...But what's a MATERIALIZED view?
----------------------------------

* A DBMS will materialize views if they are complex.
* When materializing views, a DBMS will create a result set based on the original query, then further query that result set to get the data you're looking for.
* This is opposed to simpler views, where only one result set is created.

WITH CHECK OPTION
-----------------

* `WITH CHECK OPTION` can be added to views.
* It only allows `INSERT` and `UPDATE` commands to run if they do not manipulate rows that cannot be seen by the view itself.

Horizontal and Vertical views
-----------------------------

* Horizontal rows restrict the rows that you can see.
* Vertical views restrict the columns that you can see.

On dropping tables with views
-----------------------------

* Views on a dropped table will be marked as inoperable.

Rules for updating views:
-------------------------

* DISTINCT cannot be specified in the SELECT
* The FROM clause must specify only a single table
* The SELECT list cannot contain expressions, calculated columns or column functions
* The where clause cannot include a subquery
* The query cannot contain a Group By or Having clause
* The view must not omit any required columns in the source table (those defined NOT NULL)
* Generally speaking, views are not updateable. 

Lecture 12: Security
====================

GRANT and REVOKE statement syntax
---------------------------------

{% highlight sql %}
-- GRANT syntax
GRANT SELECT, UPDATE, INSERT, DELETE
ON TableName
TO User;

-- REVOKE syntax
REVOKE SELECT, UPDATE, INSERT, DELETE
ON TableName
FROM User;
{% endhighlight %}

WITH GRANT OPTION
-----------------

* `WITH GRANT OPTION` allows other people to grant their privileges on your tables to other people.

Some questions the study guide's already answered for you
---------------------------------------------------------

* No, you can't `GRANT` privileges to more than one object at a time.
* Yes, you can grant multiple privileges to an object at a time.
* Yes, you can grant privileges to multiple users at a time.

On PUBLIC
---------

* `PUBLIC` represents all the users in the database.

On ALL PRIVILEGES
-----------------

* `ALL PRIVILEGES` is pretty self-explanatory.

Lecture 13: System Catalog
==========================

What's a system catalog?
------------------------

* A bunch of tables that are owned and maintained by the DBMS.
* They describe the structure of the database.

On USER_ and ALL_ views
-----------------------

* `USER_`contains info on objects that you are the owner of.
* `ALL_` contains info on objects that you have access to.

Recreating tables using the System Catalog
------------------------------------------

* You're on your own.

System Catalog tables
---------------------

* `User_Tables`: Tables created by you.
* `User_Tab_Columns`: Columns in tables created by you.
* `User_Views`: Views created by you.
* `User_Constraints`: Constraints created by you.
* `User_Cons_Columns`: Columns affected by constraints created by you.
* `User_Tab_Privs_Made`: Privileges granted on your objects.
* `User_Tab_Privs_Recd`: Privileges you have on other people's objects.

Lecture 14: Procedures and Functions
====================================

The difference between procedures and functions
-----------------------------------------------

* Functions return a value; procedures do not.

Parameter types
---------------

* `IN`: Passed to the procedure when it is called.
* `OUT`: A value is placed here by the procedure. It is available to whatever called the stored procedure in the first place.
* `IN OUT`: A combination of both.

Syntax
------

{% highlight sql %}
-- Stored procedure syntax
CREATE OR REPLACE PROCEDURE Name (
  ioParam IN OUT DataType
)
AS
  wVar DataType;
BEGIN
  ...
END;
/

-- Conditional processing
IF (condition) THEN
  ...
ELSE
  ...
END IF;

-- FOR loop
FOR (index = start TO end) STEP increment
  ...
END FOR;

-- WHILE loop
WHILE (condition) LOOP
  ...
END LOOP

-- Alternate clauses for functions
CREATE OR REPLACE FUNCTION Name() RETURN DataType
AS
BEGIN
  RETURN something;
END;
/
{% endhighlight %}

TO_CHAR()
---------

* Takes a number and format string, and converts the number into formatted text.
* Possible format string values are:
*    `9` – replace with a digit from the number or a space if no digit
*    `,` – Specifies a thousands separator
*    `.` – specifies the position of the decimal point
*    `S` – specifies the position of a negative or positive sign
*    `-` if negative, `+` if positive
*    If omitted: a preceding space show positive, `-` shows negative
*    `$` – Specifies that the dollar symbol should be displayed

TRIM()
------

* Removes leading and trailing spaces.

Lecture 15: Cursors
===================

What is a cursor?
-----------------

* It's a structure that contains multiple rows that can be navigated through, one row at a time.

Syntax
------

{% highlight sql %}
-- Cursors are defined in the AS clause of a procedure or function.
CURSOR CursorName IS
[SELECT goes here];

-- Stores current row.
CurrentRow CursorName%ROWTYPE;

-- Iterates through the cursor.
FOR CurrentRow IN CursorName
LOOP
  ...
END LOOP;
{% endhighlight %}

Lecture 16: Triggers
====================

The purpose of triggers
-----------------------

* Triggers are activated when database contents are modified.

Triggers and stored procedures
------------------------------

* Unlike stored procedures, a trigger is not activated by a call within a stored procedure or an `EXECUTE` statement in SQLPlus.

NEW and OLD
-----------

* Access to the data to be added, updated or deleted is available using the `NEW` and `OLD` keywords.
* When inserting a row, the `NEW` data is available.
* When deleting a row, the `OLD` data is available.
* For an update, both NEW and `OLD` are available.  

Row and table level triggers
----------------------------

* Row triggers: Execute once for each row modified.
* Table triggers: Execute once regardless of the number of rows modified.

Syntax
------

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

* `WHEN` is exclusive to row triggers, and controls whether or not the trigger executes

Lecture 17: Normalization
=========================

The three normal forms
----------------------

* First normal form: Each attribute must be a single-value attribute (that is, one value per row).
* Second normal form: Non-key attributes don't have partial functional dependencies on the primary key.
* Third normal form: No derived or transitive dependencies exist.

Anomalies
---------

* Insertion Anomaly: Data cannot be inserted into a table without inserting data that is not directly related to the data being inserted (haha, wtf is this definition)
  * It's a stupid way of saying you can't insert data into a table without inserting `UNRELATED BULLSHIT` as well (for example, course information in a Student table, when it would fit better in a Course table.)
* Deletion Anomaly: When data is deleted, other data, not directly related to the data being deleted is also lost
  * You can't delete a row without deleting other `UNRELATED BULLSHIT` with it. (for example, deleting course data along with students)
* Modification Anomaly: Modifying data requires the same data on multiple rows to be updated.

How do I anything re. normalization?
------------------------------------

* Detailed tutorials and examples are in the actual DBMS slides. They explain things better than whatever I can come up with.
