import React, {useEffect, useState} from "react";

import "./styles.css";

import api from './services/api';

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      console.log(response.data);
      setRepositories(response.data);
    });
  },[]);
  
  async function handleAddRepository() {
    // TODO
    const repository = {
        title: `ReactJS Challenge ${Date.now()}`,
        url: "https://github.com/johnf/",
        techs: [
          "ReactJS",
          "NodeJS"
        ],
        likes: 0
    }
    
    await api.post('repositories', repository).then(response =>
      setRepositories([...repositories, response.data])
    );
  }

  async function handleRemoveRepository(id) {
    // TODO
    const response = await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(repository => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
          <li key={repository.id}>
            <strong>{repository.title}</strong>
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
