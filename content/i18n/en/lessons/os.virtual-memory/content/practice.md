## Example

A virtual address is split into a page number and offset, and the page number is mapped to a physical frame. If the page is not in RAM but the access is valid, the operating system can load it after a page fault and retry the access. An invalid address or permission violation cannot be fixed by loading the page and instead results in an error.
