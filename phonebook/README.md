# Full Stack Open --- Part 2

## Phonebook App

| Contents                  |
| ------------------------- |
| [Step 1](#exercise-2.6)   |
| [Step 2](#exercise-2.7)   |
| [Step 3](#exercise-2.8)   |
| [Step 4](#exercise-2.9)   |
| [Step 5 ](#exercise-2.10) |

### Exercise 2.6

#### Phonebook, Step 1 [&#8593;](#phonebook-app)

Let's create a simple phonebook. In this part, we will only be adding names to the phonebook.

Let us start by implementing the addition of a person to the phonebook.

You can use the code below as a starting point for the App component of your application:

```react
import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      ...
    </div>
  )
}

export default App
```

The newName state is meant for controlling the form input element.

Sometimes it can be useful to render state and other variables as text for debugging purposes. You can temporarily add the following element to the rendered component:

```react
<div>debug: {newName}</div>
```

After finishing this exercise your application should look something like this:
![](./src/assets/10e.png)

NB:

- you can use the person's name as a value of the key property
- remember to prevent the default action of submitting HTML forms!
