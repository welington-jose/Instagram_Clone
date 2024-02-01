import { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import { db } from './firebase';



function Post(props){

    const [comentarios,     setComentarios] = useState([]);

    useEffect(()=>{

        const unsubscribe = db
      .collection('posts')
      .doc(props.id)
      .collection('comentarios')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        setComentarios(
          snapshot.docs.map((doc) => ({ id: doc.id, info: doc.data() }))
        );
      });

    return () => {
      unsubscribe();
    };
  }, [props.id]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const commentInput = document.querySelector(`#comentario-${props.id}`);
    const comentarioAtual = commentInput.value.trim();

    if (comentarioAtual !== '') {
      db.collection('posts')
        .doc(props.id)
        .collection('comentarios')
        .add({
          nome: props.user,
          comentario: comentarioAtual,
          timestamp: new Date(),
        })
        .then(() => {
          alert('Comentário feito com sucesso!');
          commentInput.value = '';
        })
        .catch((error) => {
          console.error('Erro ao adicionar comentário:', error);
        });
    }
  };

  return (
    <div className="postSingle">
    <p id='userPost'>{props.info.userName}</p>
      <img src={props.info.image} alt="" />
      <p>
         {props.info.titulo}
      </p>

      <div className="coments">
        {comentarios.map((comentario) => (
          <div key={comentario.id} className="coment-single">
            <p>
              <b>{comentario.info.nome}</b> {comentario.info.comentario}
            </p>
          </div>
        ))}
      </div>

      {props.user ? (
        <form onSubmit={handleCommentSubmit}>
            <input type='text' id={`comentario-${props.id}`} placeholder='Adicionar comentário...'/>
            <input type="submit" value="Publicar..."/>
        </form>
      ) : null}
    </div>
  );
}

export default Post;