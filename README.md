Eyeos Sync Service
==================

## Overview

This microservice is in charge of making sure whatever file storage solution we
use plays well with the rest of eyeos.

### What it does right now (Seafile)

Right now it is making sure that seafile works well with eyeos, in order to do
this the followign is needed.

  - When an user logins into the platform, create a seafile account (this is
    needed because seafile community edition does not work with LDAP directly)
  - When an user changes password, we should do the same in seafile

## How to use it


## Quick help

* Install modules

```bash
    $ npm install
```

* Check tests

```bash
    $ grunt test
```