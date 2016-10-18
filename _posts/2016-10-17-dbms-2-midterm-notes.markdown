---
layout: "post"
title: "DBMS 2 Midterm Notes"
date: 2016-10-17
categories: dbms
---

This will run through the topics covered in the Midterm Exam Details posted on Learn. I recommend you take a look at the course notes at least once before the exam, even if you can access them while writing.

And, above all else, good luck.

Single-Row Functions
--------------------

Single-row functions aren't going to be tested directly, but you'll be using them throughout the exam. Here's a quick summary of all of them taught to us at this point:

Strings
=======

* `UPPER(arg)` - Returns `arg` in uppercase format.
* `LOWER(arg)` - Returns `arg` in lowercase format.
* `INITCAP(arg)` - Returns `arg` with the first letter in each word capitalized. 
* `SUBSTR(arg, startpos, length)` - Returns a substring of `arg` starting from `startpos` and is limited to `length` characters.
* `INSTR(arg, string, startpos, occurencenum)` - Finds the `occurencenum`th occurence of `string` in `arg` starting at `startpos`. `startpos` and `occurencenum` are optional arguments.
* `LENGTH(arg)` - Returns the length of `arg`.
* `LPAD(arg, count, char)` - Pads to the left of `arg` with `count` of `char`.
* `RPAD(arg, count, char)` - Same thing, but to the right this time.
* `LTRIM(arg)`, `RTRIM(arg)`, and `TRIM(arg)` - Trims leading whitespace, trailing whitespace, and both, respectively.
* `REPLACE(arg, target, new)` - Replaces all occurences of `target` within `arg` with `new`. 
* `TRANSLATE(arg, targetstring, newstring)` - Similar to `REPLACE()`, but replaces character-for-character using strings to define what each character is replaced with.
* `CONCAT(arg1, arg2)` - Works like the `||` operator; combines two strings. 

Numbers
=======

* `ROUND(arg, decimalpos)` - Returns `arg` rounded to the nearest `decimalpos`.
* `TRUNC(arg, decimalpos)` - Similar to `ROUND()`, but no rounding is used.
* `MOD(arg1, arg2)` - Returns the modulus of `arg1` and `arg2`. (i.e. the remainder of a division.)
* `ABS(arg)` - Returns the absolute value of `arg`. 
* `TO_CHAR(number, formatstring)` - Formats numbers. Can be used to display currency.
* `TO_NUMBER(numberstring, formatstring)` - Literally the reverse of `TO_CHAR`. 

Dates
=====

* `MONTHS_BETWEEN(date1, date2)` - Self-explanatory.
* `ADD_MONTHS(date, months)` - Also self-explanatory. 
* `NEXT_DAY(date, dayOfTheWeek)` - returns the next occurence of `dayOfTheWeek` after `date`. 
* `TO_DATE(datestring, formatstring)` - Converts character representations of dates to the internal database format for processing.
* `ROUND(date, precision)` - Rounds the date to the nearest `MONTH`, `DAY`, or `YEAR`. 
* `TRUNC(date)` - Removes the time portion of a date.
* `TO_CHAR(date, formatstring)` - Literally the reverse of `TO_DATE`. 

Miscellaneous
=============

* `NVL(arg, substitute)` - Substitutes `arg` for `substitute` when `arg` is `NULL`. 
* `NVL2(arg, notnullvalue, nullvalue)` - More complicated version of NVL(). Substitutes based on whether or not there is a value.
* `DECODE()` - Basically allows you to replace certain values with others. Refer to the course notes for specific syntax.
* `SOUNDEX(arg)` - Returns a phonetic representation of `arg`. Can be used to find things that *sound* like others when spoken.

Importing data using SQLLDR
---------------------------

You'll need a control file that looks something like this:

{% highlight sql %}
-- ControlFile.ctl
LOAD DATA
INFILE 'filename'
BADFILE 'filename'
DISCARDFILE 'filename'
LOG 'filename'
CONVENTIONAL|DIRECT|PARALLEL
Loadmethod INTO TABLE tablename
WHEN conditioncheck
FIELDS TERMINATED BY 'character'
OPTIONALLY ENCLOSED BY 'character'
(col1 fmt, col2 fmt, ...)
{% endhighlight %}

This control file is invoked with SQLLDR with something that looks like this:

{% highlight sql %}
SQLLDR username/password@dbname CONTROL=ControlFile.ctl
{% endhighlight %}

This snippet can be added to a batch file.

Writing DOS Batch Files
-----------------------

All of you people should know how to program at this point. Here's an example to show you how batch file syntax works:

{% highlight batch %}
:MENU_LOOP
REM Clear console and display menu.
CLS
ECHO.
ECHO Hot Meme Factory
ECHO.
ECHO 1. Generate Report
ECHO 2. Exit
ECHO.

REM Get user input.
SET choice=
SET /P choice=Enter your choice: 
ECHO.

REM User input processing.
IF "%choice%"=="1" GOTO GENERATE_REPORT
IF "%choice%"=="2" EXIT
IF "%choice%"=="" (
	ECHO Error - No choice entered. Please choose an option displayed.
) ELSE (
	ECHO Error - Invalid choice entered. Please choose a valid option.
)
ECHO.
PAUSE
GOTO MENU_LOOP

:GENERATE_REPORT
REM If needed, create the folder to store the report in.
IF NOT EXIST "H:\Backups\Reports" (
	MKDIR "H:\Backups\Reports"
)

REM Run the SQL script.
SQLPLUS -S /nolog @AScript.sql
PAUSE
GOTO MENU_LOOP
{% endhighlight %}

Using Substitution Variables
----------------------------

* Prefix variable name with `&` in order to have the server prompt for a user-entered value.
* Prefix a variable name with `&&` to have the server prompt for a value. This value persists if the same variable is called multiple times.
* Alternatively, use the `ACCEPT` clause:

{% highlight sql %}
-- Works like &&Variable, but allows for data checking.
ACCEPT Variable DATATYPE FORMAT 'FormatString' PROMPT 'Drop some sick fires, bro: '
{% endhighlight %}

* The `DEFINE` clause lets you check all variables that have been defined.
* `UNDEFINE` is self-explanatory.
* If spooling, you want to use `SET VERIFY OFF` to prevent unwanted messages to appear in your output.

Formatting Reports
------------------

There's no easy way to explain reports. Here's an example, with gratuitous commenting.

{% highlight sql %}
-- Connection string
CONN user/password@DBName

-- Nukes unwanted messages.
SET ECHO OFF
SET FEEDBACK OFF
SET VERIFY OFF

-- Sets page size and line size.
SET PAGESIZE 30
SET LINESIZE 120


-- Accept Customer ID as input
ACCEPT CustomerID NUMBER FORMAT '999' PROMPT 'CustomerID: '

-- Open file for writing, create it if it doesn't exist
SPOOL somewhere.txt REPLACE

-- Report formatting.
-- Corresponds to columns returned in the SELECT query.
COLUMN AgreementID HEADING 'Agreement'
COLUMN FName HEADING 'First Name' FORMAT A15 TRU -- TRU truncates a string at the end of a line.
COLUMN LName HEADING 'Last Name' FORMAT A15 TRU -- FORMAT clause specifies the length of a column.
COLUMN AgreementDate HEADING 'Date' FORMAT A12
COLUMN Name HEADING 'Movie Name' FORMAT A55 TRU
COLUMN RentalAmount HEADING 'Paid' FORMAT $999.99

-- Top title
TTITLE CENTER 'Movie Rental Details for Client ' &CustomerID - -- Dash represents a line continuation.
       RIGHT 'Page: ' FORMAT 9 SQL.PNO SKIP 3
-- SQL.PNO is the page number
-- SKIP defines how many lines to skip

-- Bottom title
BTITLE LEFT 'Run by:PRODREPORT' -
       CENTER 'End of Report'

-- Removes duplicate entries.
BREAK ON AgreementID ON FName ON LName ON REPORT
COMPUTE SUM LABEL 'Total: ' OF RentalAmount ON REPORT

-- Report query
SELECT RentalAgreement.AgreementID, FName, LName, AgreementDate, Name, MovieRented.RentalAmount
FROM Customer, RentalAgreement, MovieRented, Movie
WHERE Customer.CustID = RentalAgreement.CustID
AND RentalAgreement.AgreementID = MovieRented.AgreementID
AND Movie.MovieID = MovieRented.MovieID
AND &CustomerID = Customer.CustID
ORDER BY RentalAgreement.AgreementID;

-- Close file
SPOOL OFF
EXIT
{% endhighlight %}

The report will produce something like this:

{% highlight batch %}

                                           Movie Rental Details for Client 933                                  Page:  1
                                                                                                                        
                                                                                                                        
 Agreement First Name      Last Name       Date         Movie Name                                                  Paid
---------- --------------- --------------- ------------ ------------------------------------------------------- --------
         7 Willie          Leake           2014-01-04   Phantom of the Opera                                       $2.28
                                           2014-01-04   Tombstone                                                  $3.73
                                           2014-01-04   BraveHeart                                                 $4.05
        25 Willie          Leake           2014-01-15   Edward Scissorhands                                        $4.21
        32 Willie          Leake           2014-01-19   Demolition Man                                             $3.28
        39 Willie          Leake           2014-01-22   The Patriot                                                $3.70
        85 Willie          Leake           2014-02-05   Speed                                                      $3.69
********** *************** ***************                                                                      --------
Total:                                                                                                            $24.94














Run by:PRODREPORT                                     End of Report        
********* Remind me to remove this line.
{% endhighlight %}

Table Maintenance
-----------------

* Half of this crap is in last semester's noteset, [which is conveniently located here.](http://ultrasaber.github.io/dbms/2016/02/28/dbms-midterm-notes.html)
* Additionally:

{% highlight sql %}
-- Mark a column for deletion
ALTER TABLE tablename
	SET UNUSED (columnname);
-- or --
ALTER TABLE tablename
	SET UNUSED COLUMN columnname;

-- Deletes unused columns
ALTER TABLE tablename
	DROP UNUSED COLUMNS;

-- Rename table.
ALTER TABLE tablename RENAME TO newname;

-- Rename column.
ALTER TABLE tablename
	RENAME COLUMN existingcolumnname TO newcolumnname;

-- Nuke all rows in a table.
TRUNCATE TABLE tablename;

-- The recyclebin is like a graveyard for tables
SELECT Object_Name, Original_Name
FROM Recyclebin;

-- The FLASHBACK command recovers a table from the recycle bin
FLASHBACK TABLE name
TO BEFORE DROP;

-- PURGE permanently removes things.
PURGE TABLE BIN$PrI04EsJSXyV7Pu/tvTHbw==$0;
OR
PURGE TABLE name;

-- To permanently remove all objects from the recycle bin:
PURGE Recyclebin;
{% endhighlight %}

Sequences
---------

{% highlight sql %}
-- Create syntax
CREATE SEQUENCE sequencename
[START WITH value]
[INCREMENT BY value]
[MAXVALUE value | NOMAXVALUE]
[MINVALUE value | NOMINVALUE]
[CYCLE | NOCYCLE]
[ORDER | NOORDER]
[CACHE value | NOCACHE];

-- Alter syntax
ALTER SEQUENCE sequencename
...
-- NOTE: START WITH value cannot be altered – drop the sequence and re-create it

-- Drop syntax
DROP SEQUENCE sequencename;
{% endhighlight %}

Indexes/indices/FFFFFFFFFFFFFFFFFFFFF
-------

{% highlight sql %}
-- Create syntax
CREATE [UNIQUE] INDEX <schema>.<indexname>
ON <schema>.<tablename>
(<colname> ASC|DESC,
<colname> ASC|DESC, ..)
ONLINE
COMPUTE STATISTICS;

-- Gathering statistics
EXEC DBMS_STATS.GATHER_SCHEMA_STATS(ownname=>'TU',cascade=>TRUE);

ANALYZE INDEX Customer_PK
VALIDATE STRUCTURE;

-- Data Dictionary Information
USER_INDEXES
USER_IND_COLUMNS
INDEX_STATS

-- Preventing Index Browning
-- ANALYZE index structure to obtain necessary stats
ANALYZE INDEX PK_RentalAgreement VALIDATE STRUCTURE;

-- Obtain the Balance Ratio
SELECT ROUND(Del_LF_Rows_len/LF_Rows_Len * 100) Balance_Ratio
FROM Index_Stats
WHERE NAME = 'PK_RENTALAGREEMENT';

-- If ratio is higher than 20%, an index rebuild is in order
ALTER INDEX PK_RentalAgreement REBUILD ONLINE;
{% endhighlight %}

Users and Roles
---------------

* Grant info can be found [here.](http://ultrasaber.github.io/dbms/2016/04/24/dbms-final-notes.html)

{% highlight sql %}
-- Create syntax
CREATE USER user IDENTIFIED BY password;
CREATE ROLE AgreementEntry IDENTIFIED BY password;

GRANT [permission | role], [permission | role], ...
TO user, user, ...
WITH ADMIN OPTION; -- Allows user to grant permissions to others.

-- Examples
GRANT CREATE SESSION TO TestUser;
GRANT CREATE SEQUENCE,
CREATE SYNONYM,
CREATE TABLE,
CREATE VIEW TO TestUser;

-- Assign one or more roles as default
ALTER USER username DEFAULT ROLE role, role, ...;
-- Assign all granted roles as default
ALTER USER username DEFAULT ROLE ALL;
-- Assign all roles except those listed as default
ALTER USER username DEFAULT ROLE ALL EXCEPT role, role, ...;
-- Set the user so no roles are default
ALTER USER username DEFAULT ROLE NONE;

--Revoke object privileges with REVOKE command
REVOKE objectprivilege, objectprivilege, ...
ON Objectname
FROM username|rolename, username|rolename, ...;


{% endhighlight %}

* `[permission] ANY TABLE` is an object that allows a specified permission across all tables in all schemas.
* `CREATE SESSION` allows a user to connect to a database.
* `PASSWORD` is a command that lets you change your own password. For other users, use `ALTER USER`.
* `DBA` is a build in role for database admins.

* Roles can be granted permissions like users, and a user can be granted a role like a permission.
* Roles can be `ALTER`ed to have a password after creation
* `SET ROLE rolename` allows non-default roles to be enabled, requires the `IDENTIFIED BY` clause if the role is password protected
* `ROLE_SYS_PRIVS` lists all system privileges assigned to a role
* `ROLE_TAB_PRIVS` lists all table privileges assigned to a role
* `ROLE_ROLE_PRIVS` lists all roles assigned to another role
* `SESSION_PRIVS` lists user’s currently enabled privileges 
* `SESSION_ROLES` lists user’s currently enabled roles
