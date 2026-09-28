## Protocols Divide Responsibilities

A **protocol** is a set of agreed rules for message formats and processing. No single protocol handles every part of communication. Ethernet delivers frames over the same link, IP delivers packets across networks, TCP and UDP handle transport between programs, and HTTP defines web requests and responses.

When you enter a web address, DNS helps find the corresponding IP address, and protocols at several layers then add their own headers to deliver the data. To distinguish protocols, ask: “Which scope of endpoints does it connect?”, “What data unit does it handle?”, and “Which problem is it responsible for?”
