# MyAgenda App

## Descrição

<p>
  A modern, offline-first personal agenda built with React and React Router, designed to deliver a real-world productivity experience without relying on a backend or authentication system. 
  
  The application features an interactive calendar with day and week views, allowing users to create, organize, and manage activities with categories, color-coding, filtering, and drag-and-drop rescheduling, all enhanced by responsive design, dark/light mode, and subtle animations. 
</p>


## Stack
- React – a library for building user interfaces with reusable components.
- i18n (react-i18next) – a library for handling internationalization and enabling multi-language support.
- Tailwind CSS – a utility-first CSS framework for rapidly building custom user interfaces.
- Zustand – a lightweight library for managing global state in a simple and scalable way.
- IndexedDB (idb) – a library that simplifies using IndexedDB for client-side data persistence.


## Why IndexedDB?
<p>
With the IndexedDB (idb) the data is persisted locally, enabling scalable client-side storage and full offline functionality, while also demonstrating awareness of architectural trade-offs, since data remains isolated per device and could be extended in the future with a backend for synchronization.

The main reason for this app is to practice animations, Tailwind, and Zustand. That is why I did not think it was necessary to develop a backend for it, and why IndexedDB was perfect in this case.
</p>



