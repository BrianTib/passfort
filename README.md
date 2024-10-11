# PassFort

![logo](./src-tauri/icons/128x128.png)

## Description

PassFort is an offline open-source desktop application for keeping track your various passwords throughout the internet

## Ideas

When storing the password in memory, encrypt it using a formatted key something like passfort-{number}. The number should be such that it makes mathematical sense for the duration the master password should be stored in memory. This would make it so that the key does not need to be stored in memory (or elsewhere) and can be deduced logically by time plus when the user requested to momentarily store it. Perhaps a UNIX stamp truncated by some interval?
