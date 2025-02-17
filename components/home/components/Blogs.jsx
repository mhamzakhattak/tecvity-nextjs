import { allBlogs } from "@/data/blogs";
import Image from "next/image";
import Link from "next/link";

function sortByDateDescending(posts) {
  return posts.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
}

export default function Blogs() {
  const recentThreePosts = sortByDateDescending(allBlogs).slice(0, 3);

  return (
    <section className="blog-area space">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xxl-7 col-xl-6 col-lg-8">
            <div className="title-area text-center">
              <h2 className="sec-title">Read Our Articles</h2>
            </div>
          </div>
        </div>
        <div className="row gy-40 justify-content-center">
          {recentThreePosts.map((elm, i) => (
            <div key={i} className="col-lg-4 col-md-6">
              <div className="blog-card">
                <div className="blog-img">
                  <Link scroll={false} href={`/blogs/${elm.title.replace(/\s+/g, '-').toLowerCase()}`}>
                    <Image
                      width={416}
                      height={314}
                      src={elm.image}
                      alt="blog image"
                    />
                  </Link>
                </div>
                <div className="blog-content">
                  <div className="post-meta-item blog-meta">
                    <a href="#">{elm.date}</a>
                    <a href={`/blogs/category/${elm.category.toLowerCase()}`}>{elm.category}</a>
                  </div>
                  <h4 className="blog-title">
                    <Link scroll={false} href={`/blogs/${elm.title.replace(/\s+/g, '-').toLowerCase()}`}>
                      {elm.title}
                    </Link>
                  </h4>
                  <Link
                    scroll={false}
                    href={`/blogs/${elm.title.replace(/\s+/g, '-').toLowerCase()}`}
                    className="link-btn"
                  >
                    <span className="link-effect">
                      <span className="effect-1">READ MORE</span>
                      <span className="effect-1">READ MORE</span>
                    </span>
                    <Image
                      width={13}
                      height={13}
                      src="/assets/img/icon/arrow-left-top.svg"
                      alt="icon"
                    />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
