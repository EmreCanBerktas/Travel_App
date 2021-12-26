import React, { useState, useEffect } from "react";
import Card from "../../components/Card";
import { bookPost, getAllPosts } from "../../firebase/store";

function Posts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const ref = getAllPosts();
    if (!ref) return;
    const cancelSnapshot = ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        data["docID"] = doc.id;
        items.push(data);
      });
      setPosts(items);
    });
    return () => cancelSnapshot();
  }, []);
  const handleSubmit = (post) => {
    console.log(post);
    bookPost(post.docID, post);
  };
  return posts.map((post) => {
    return (
      <Card
        key={post.docID}
        arrival={post.arrival}
        carModel={post.carModel}
        departure={post.departure}
        driveruid={post.owner}
        price={post.price}
        seatLeft={post.seatLeft}
        onSubmit={() => handleSubmit(post)}
        departurePoint={post.departurePoint}
        destination={post.destination}
      />
    );
  });
}

export default Posts;
