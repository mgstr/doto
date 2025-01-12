# doto

Local first todo list tracker implemented as Chrome browser extension. Data will
be saved in syncronized storage (which will be synched to you Google account).

MVP:

- Inbox: folder to collect information thats needs to be processed.
- Projects: list of active projects, each project could contain one or more
  tasks.
- Today: view that lists all tasks that have due date set to today or have due
  date in the past.

Inbox: two modes: collecting and processing: Collecting:

- add lines of text, that represent some idea/task/remainder/note etc and needs
  to be processed later ? may be hide all collected info to avoid using inbox as
  a "pseudo" project - and show only number of items in Inbox? Processing:
- present collected lines of text, one by one with wollowing alternatives
- DELETE idea was bad, not actual or not important or actually was already done
- CREATE a project: idea is worth implementing, but requires more than one step
  to complete. Open project creation page that will have project title already
  filled with line of the Inbox.
- MOVE as action to existing project. Ask to which project to move and create a
  new action inside selected project with action title filled with Inbox line ?
  SOMEDAY - when I am not sure that idea is worth implementing in the near
  future, but it is worth going back to reconsidering it in some time in the
  future?

Projects: List of active projects. Project is some desired outcome that requires
more than one step to complete. Has title and list of actions.

- Needs fast filtering to find project
- If there is no action on the project is should be visualy marked on the
  projects list as candidate for completion
- If there was not activity on the project for a specific time it should be
  marked on the project list candidate for review ? Does project needs separate
  field for description? ? Filter by project title or description as well?
- Project could be marked as completed (if there is not not completed actions)
- Project could be renamed
- Project could be reviewed to make sure the next action(s) are up to date
- Project has ordered list of actions

Action

- Has a title and checkbox for completion.
- Optionally has due date for time sensitive actions ? Potentially could be
  repeatable (not in the MVP) ? Potentially could have a completion date to
  allow showing it till EOB

Today Dashboard showing all actions that has due date set for today or in the
past. Action should also point to the project, so you can easily navigate to the
project.

TODO:

- File System Access API for storing data on the local file (that can be
  Dropbox, Google Drive or another syncronized storage)
