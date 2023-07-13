import Link from "next/link"

export default function PostCard({ post }) {
    return (
        <Link href={post.uri} className={"card"} id={post.id}>
            <a className="card">
                <h3>{post.title} &rarr;</h3>
                <span>{post.post_acf_data.shortDescription}</span>
            </a>
        </Link>
    )
}