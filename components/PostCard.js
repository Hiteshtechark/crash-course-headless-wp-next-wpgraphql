import Link from "next/link"

export default function PostCard({ post }) {
    console.log(post);
    return (
        <Link href={post.uri} className={"card"}>
            <a className="card">
                <h3>{post.title} &rarr;</h3>
                {post.post_acf_data.shortDescription}
            </a>
        </Link>
    )
}