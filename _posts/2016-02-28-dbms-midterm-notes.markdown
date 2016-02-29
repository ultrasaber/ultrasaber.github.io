---
layout: post
title: "DBMS Midterm Notes"
date: "2016-02-28 18:11:38 Central Standard Time"
categories: dbms
---
Here's a collection of SQL notes that I've put together just before midterms. I hope it beats sifting through hundreds of slides.

##Lecture 1: Intro

#Data model:

* Structures and access techniques for a DBMS

#DBMS:

* Became popular in the 70's/80's
* Each model has adv. and dis.

#3 primary data models:

* Hierachical
* Network
* Relational

* Relational can be considered as a simplification of previous models

* Hierarchical and Network: Powerful, but difficult. Used in legacy systems.
* Relational: Simple, but inefficient. Used in virtually all new projects.

* Relational: Data is organized into tables. Database operations work off of these tables.

* Table: Rectangular object w/ rows and columns.

#Rows:

* A row has one data value or NULL for each column.

#Columns:

* Data in columns have the same datatype.
* Columns are written as headings in output.
* Column names must be unique.
* Columns have a left-right order that is defined when the table is created.

* Tables must have one column.
* DBMS' typically impose a 255 column limit.
* A table may have zero or more rows. Zero rows = empty table.
* The order of the rows is not important.
* Most relational DBMS' allow virtually unlimited rows (or, ~2 billion rows)

#Columns:

* Basic building blocks of a row
* Attributes on a row define an entity
* Can be simple, composite, stored, derived, or NULL

#Simple attributes:

* Are not divisible

#Composite attributes:

* Are divisible

#Stored attributes:

* Manually entered/provided

#Derived attributes:

* Derived from other attributes.

#NULL:

* It's literally nothing.
* The value can be missing or not known.

#Primary key:

* Attribute that identifies rows.
* Composite primary keys are made up of multiple columns.

#Requirements for primary keys:

* Cannot be NULL
* Unique values per row
* Values cannot change.
* Numbers and dates are the best.
* Character datatypes should be explicitly designed to be a primary key.
* Names and descriptions are shitty primary keys.

#Candidate primary key:

* Attributes that CAN be used as a primary key.
* Tables may only have one primary key.

#Surrogate primary key:

* Column that is arbitrarily added to a table to be used as a primary key.
* No meaning for the business; only used to store data.
* Determined by the system.
* Consist of incremental numbers or timestamps
* Guaranteed unique
* Spelling errors eliminated
* Simplifies data model
* Increases processing
* Introduces more storage
* May cause confusion

#Relationships:

* Tables rarely exist by themselves
* Relationships are expressed as parents and children
* Primary keys define the parent.
* Specified when tables are created.

#Foreign key:

* Columns that correspond to the primary key column of a table.
* Create the relationships.

##Lecture 2: ERDs

#ERD:

* Shows how data is related
* Quick review of database contents
* Entities, attributes, relationships

#Entity: 

* A thing that exists independently.
* Physical or conceptual.
* Collection objects that have the same attributes.
* Become tables.

#Attributes:

* Information that describes an entity.
* Become columns.

#Relationships: 

* How entities are related.
* May or may not be specified when tables are built.

#Creating ERDs

* Visio: Crow's foot database notation

#Cardinality: 

* How many are involved this relationship?

* One-to-One
* One-to-Many
* Many-to-Many

* M2M relationships must be resolved to O2M relationships before the database is built.

#Recursive relationships

* A thing is related to itself.

#N-ary relationships: 

* A relationship involving N entities.
* Binary relationships are the most common.

#3 types of ERD:

* Context: Entities and Relationships
* Key-Based: Context + Keys and resolves M2M relationships
* Full Attribute: Key-based + remaining attributes

#Resolving M2M relationships:

* Make a new entity.
* PKs of the new entity are the PKs of the original entities.
* Swap the cardinalities.
* Remove the original relationship.
* You should have two O2M relationships with the new entity.

##Lecture 3: Intro to SQL

* SQL: language used in relational databases.
* Domain specific: not used for anything but interacting with the database.

#SQL:

* Creates databases
* Creates tables
* Manipulates data
* Controls database structure
* Adds/deletes users
* Enforces security

* SQL is a standard defined by ANSI and ISO.
* Released in 1986, expanded in 1992
* Most companies use this standard.
* SQL can be moved between DBMS'.

* No conditional logic
* No looping
* No variables
* No programming mechanisms

* Standard/vendor specific SQL

#Vendor specific SQL:

* Flexible
* No code portability

#2 types of SQL:

* Data Definition Language: Deals with database structure
* Data Manipulation Language: Deals with data

* SQL features a high-level English-like structure
* Statements begin with a verb
* Made up of clauses; some are required, some are optional
* Verbs and clauses are reserved by SQL

* DDL: CREATE, ALTER, DROP
* DML: SELECT, DELETE, INSERT, UPDATE
* Misc: GRANT, REVOKE

#Naming objects

* All objects require unique names
* Names are typically specified in the ERD
* Max. size is 30 characters
* Letters + numbers
* Case-insensitive
* Starts with a letter
* Cannot be an SQL verb or clause.
* Many DBMS' allow special characters, but avoid them for portablility

##Lecture 4: Datatypes, Create tables, Constraints

* Datatypes define what can be used in SQL tables
* ANSI dictates the datatypes that all DBMS' should provide
* Most DBMS' implement these data types
* DBMS' implement datatypes differently, and may not work identically.
* Oracle does not implement all standard datatypes.

#CHAR(x): 

* A sequence of characters of X(default 1, range 1-2000) length. 
* Padded with spaces.

#VARCHAR2(X): 
* A sequence of characters of X(range 1-4000) length. 
* Not padded.

* Both CHAR and VARCHAR2 may be assigned a shorter value than the maximum length.
* A Data Truncation Error will occur if there is an attempt to place a larger value than the limit.

#NUMBER:

* All numbers in Oracle; integers, floats, fixed-points
* Does not exist in the ANSI/ISO standard

#NUMBER(P,S):

* P = Precision: total digits in a number.
* S = Scale: digits after the decimal point.

#Integer:

* A whole number.
* Integers defined by NUMBER(X,0)

#Decimal:

* Number of decimal positions is fixed and does not change
* Defined by NUMBER(P,S)

#Float: 

* a number where the decimal position can change
* Defined by NUMBER

#DATE/TIME:

* Dates/timestamps.
* Oracle only implements DATE.

#TIMESTAMP: 

* a seven-part value, as opposed to DATE's four-part value.

#Symbolic constants

* CURRENT_DATE
* CURRENT_TIMESTAMP
* USER: Currently logged-on user

#Creating tables:

* DROP the tables first.
* CREATE the tables.
* ALTER them.

#Constraints:

* Enforces integrity.
* Rules that restrict values
* Ensure data is stable and dependable.
* In-line constraints: defined as the column is defined (NULL)
* Out-of-Line constraints: defined separately (PK, UNIQUE, FK, CHECK)

#Naming constraints

* Constraints must be named.
* 30 character limit
* Letters and numbers
* Start with a letter
* Avoid special characters
* Names are useful for handling errors or ALTERing.
* System-generated names are cumbersome and in some cases dangerous to work with

#ON DELETE clause

* ON DELETE CASCADE: deletes child rows associated with the parent row.
* ON DELETE RESTRICT: the opposite. Not included in Oracle.
* ON DELETE SET NULL: Sets child row foreign keys to NULL.

#CREATE Syntax: 
{% highlight sql %}
DROP TABLE *;

CREATE TABLE *
(
  FieldName FieldType NOT NULL,
  FieldName FieldType

  CONSTRAINT * 
    PRIMARY KEY(FieldName),
  CONSTRAINT *
    UNIQUE(FieldName, FieldName), -* Checks if combinations of columns are unique.
  CONSTRAINT *
    FOREIGN KEY(FieldName)
    REFERENCES TableName
    ON DELETE CASCADE,
  CONSTRAINT *
    CHECK(FieldName > 0 AND FieldName < 100 OR something)
);

ALTER TABLE *
	DROP CONSTRAINT *;

ALTER TABLE * ADD
	CONSTRAINT *
	CHECK ();

ALTER TABLE *
	MODIFY FieldName NULL;

ALTER TABLE *
	ADD FieldName FieldType;

ALTER TABLE *
	MODIFY FieldName FieldType;

ALTER TABLE *
	DROP COLUMN FieldName;
{% endhighlight %}

* Drop tables in the reverse order that you create them!

##Lecture 5: Simple Selects

#SELECT: 

* Retrieves data from tables.

#Parts of the SELECT statement

* SELECT: Data items.
* FROM: Tables to query.
* WHERE: Conditions.
* ORDER BY: Sorts results.

#Order of execution:

1. FROM
2. WHERE
3. SELECT
4. ORDER BY

#Temporary result set:

* available when clauses are run
* Can be empty

#SELECT column:

* all columns in a table
* column names
* literals
* SQL expressions
* Avoid the wildcard in production situations.
* SELECT Column AS Name: renames columns.

#WHERE:

* can compare values, such as:

* Columns
* Expressions
* Literals

#WHERE conditions:

* Comparison WHERE X = Y
* Range WHERE X BETWEEN Y AND Z
* Set Member WHERE X IN (Y,Z,A)
* Pattern Match WHERE X LIKE '\_F%'
* Null WHERE X IS/IS NOT NULL

* Multiple conditions may be added with AND or OR.

#Wildcards

* %: any string of characters
* \_: one character

#Literal DATEs
* DATEs: should be in 'YYYY-MM-DD'.

#ORDER BY X (ASC/DESC)

* Can specify by column position/given name

#SELECT DISTINCT column:

* removes duplicates from output

#Regarding implicitly sorted data:
* Ensure data is sorted by ORDER BY, if specified. Don't rely on implicit stuff.

#Regarding DATEs:

* Dates are treated like strings AND numbers, but they are a different type altogether.
* Dates have a time component (0-86399): seconds after midnight

* To compare a date and a time, use the TO_DATE() function
* TO_DATE(date, format-string)

#DATE format strings:

* YYYY
* MM
* DD
* HH
* HH24
* MI
* SS

#DATE built-in functions

* TRUNC(): truncates seconds from the date
* EXTRACT(YEAR/MONTH/DAY FROM date): extracts individual parts of a date
* ADD_MONTHS(date, x): add x months to date

#Regarding math with DATEs

* Subtracting dates gives a number of days.

#String built-in functions

* LOWER(): Convert column data to lowercase
* UPPER(): Convert column data to uppercase.
* SUBSTRING(col, position, length): Returns a substring.
* Note: Characters are NOT zero-indexed!

##Lecture 6: Joins

#Joins

* Form rows from two or more tables.
* Equi-join: Exact match between two columns.
* Joins are typically based on primary and foreign keys.
* Without a WHERE clause, Cartesian Joins are produced.

#When NOT to use a Join

* Joins are resource-intensive.
* Never use a join when it isn't necessary.

#Join standards: 

* Alphabetical order, PKs first

#Execution:

1. Get left row
2. Get right row
3. Compare
4. Get another right row
5. When all right rows are checked, get another left row.

* For each row, an entire table is read.

* If a parent row has no children, they will not appear in the results.
* if a child row does not have a parent, it also will not appear in the results.

* Joins don't necessarily have to be between the PK and FK, nor does the condition have to be equal.


#Aliases: 

* Alternate names for tables.
* FROM tablename Alias, anothertable Alias2

#Inner and Outer Joins

* Inner join: Children must have parents.
* Outer join: the opposite.

* Left outer: rows on the left will be joined to NULL
* Right outer: rows on the right will be joined to NULL
* Full: rows on the left and right will be joined to NULL

##Lecture 7: Summary Queries

#Summary queries:

* Summarizes all data given.
* NULL is ignored in summary queries.

#Summary query functions:

* SUM()
* AVG()
* MIN()
* MAX()
* COUNT() - Can add DISTINCT keyword to remove duplicates

* COUNT(\*): counts rows, not columns

##Lecture 8: Summary Queries with GROUP BY

#GROUP BY:

* Returns data in a single summary row based on values for group criteria.
* Multiple columns will produce groups for each combination.
* Columns that are not summarized must be put into a GROUP BY.

#HAVING:

* HAVING applies conditions after groups are created.

#Execution:

1. FROM
2. WHERE
3. GROUP BY
4. HAVING
5. SELECT
6. ORDER BY

#Regarding WHERE and HAVING

* WHERE eliminates rows
* HAVING eliminates groups

#Regarding NULLs in GROUP BY clauses

* GROUP BY handles NULLs as their own value.

##Lecture 9: Subqueries

#Subquery:

* Queries inside queries.
* Subqueries are places in parenthesis.
* Subqueries must return a single column.
* Relational operators cannot be used by themselves if a subquery returns more than one row.
* ORDER BY cannot be specified in a subquery.
* Subqueries may have subqueries.
* Subqueries may also be written as joins.

#Correlated and Non-correlated subqueries

* Non-correlated: Subquery only executes once. Takes longer to execute than queries without a subquery.
* Correlated: Subquery is executed many times. Uses an Outer Reference.
* IN tests a value against values in a set returned by a subquery.
* EXISTS tests if a subquery returns any rows.

# Queries, ordered by efficiency:

1. Simple select
2. Non-correlated subquery
3. Join
4. Correlated subquery

