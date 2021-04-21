/* SPA - Teremos problema com SEO pois os dados só passam a existir depois da 
 * resposta da requisição interna da página.

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    fetch("http://localhost:3333/epsodes")
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, []);
  return <h1>Index</h1>;
} 
*/

/**
 * SSR - Usando a função getServerSideProps conseguimos passar via Props pro nosso
 * componente as informações. Teremos acesso as informações antes da pagina ser
 * renderizada, elas ja estão disponíveis do lado do servidor; Ele é executado
 * toda vez que alguém acessa nossa aplicação.
 */

/* export default function Home(props) {
  return (
    <>
      <h1>Index</h1>
      <p>{JSON.stringify(props.episodes)}</p>
    </>
  );
}

export async function getServerSideProps() {
  const response = await fetch("http://localhost:3333/epsodes");
  const data = response.json();

  return {
    props: {
      episodes: data,
    },
  };
} */

/**
 * SSG - Faz um cache dos dados para que não seja necessário que essas informações
 * sejam pegas a todo momento da API. Só funciona em produção precisamos roda build
 */

export default function Home(props) {
  return (
    <>
      <h1>Index</h1>
      <p>{JSON.stringify(props.episodes)}</p>
    </>
  );
}

export async function getStaticProps() {
  const response = await fetch("http://localhost:3333/episodes");
  const data = await response.json();

  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8,
  };
}
