import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

const supabaseUrl = import.meta.env.VITE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function App() {
  const [posts, setPosts] = useState([]);
  const [signIn, setSignIn] = useState(false);

  async function getPosts() {
    const { data } = await supabase.from("posts").select();
    setPosts(data);
  }

  async function signInWithGithub() {
    await supabase.auth.signInWithOAuth({
      provider: "github",
    });
  }

  async function checkSignIn() {
    const session = await supabase.auth.getSession();
    const isSignIn = !!session.data.session;

    setSignIn(isSignIn);
  }

  async function signOut() {
    await supabase.auth.signOut();
    checkSignIn();
  }

  useEffect(() => {
    getPosts();
    checkSignIn();
  }, []);

  return (
    <main>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
      {signIn ? (
        <SignInBtn text="로그아웃" onClick={signOut} />
      ) : (
        <SignInBtn text="로그인" onClick={signInWithGithub} />
      )}
    </main>
  );
}

function SignInBtn({ text, onClick }) {
  return (
    <button type="button" onClick={onClick}>
      {text}
    </button>
  );
}

export default App;
