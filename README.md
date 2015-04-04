# Report-Wizard

This is a simple report wizard written in Javascript, jQuery, bootstrap, HTML and CCS3. It allows the user to create a report and schedule it for one time use or recurring and they can select which columns they want on the report and change the order of the columns. They can also change the sort order for each column and choose filtering options.

This page uses fake data and doesn't actually save when clicking on the save report button.

The entire report wizard is on one page and each step is separated with the bootstrap accordian control. This page is an aspx page but it doesn't have any code behind and doesn't use any .net conrols. Its all plain html controls that are styled up with bootstrap.

Currently the up and down buttons don't look right and the step 3 section in the accordian panel doesn't look right either. I need to go in and fix this problem but it is fully functional though when moving data from one listbox to another.

The Report wizard is in the “WebApplication1” folder in a file called “ReportWizard.aspx”.

Also take a look at the “Report Table Row Expandibility Test Page.htm” page.  It is a table that has an expand and collapse button and uses the jQuery toggle method to show and hide all table rows after the first row.
