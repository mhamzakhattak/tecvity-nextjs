"use client"
import { socialMediaLinks } from "@/data/socials";
import { useEffect, useState } from "react";
import Comments from "./Comments";
import CommentReply from "./CommentReply";
import BlogSearchbar from "./BlogSearchbar";
import Categories from "./Categories";
import RecentPosts from "./RecentPosts";
import Tags from "./Tags";
import Image from "next/image";
import { allBlogs } from "@/data/blogs";
import { useGetData } from "@/utils/hooks";

export default function BlogDetails({ blogTitle }) {
  const decodedBlogTitle = blogTitle.replace(/-/g, ' ').toLowerCase();
  const blogItem = allBlogs.find((post) => post.title.toLowerCase() === decodedBlogTitle.toLowerCase()) || allBlogs[0];

  const currentIndex = allBlogs.findIndex((blog) => blog.title.toLowerCase() === decodedBlogTitle.toLowerCase());
  const nextBlog = currentIndex >= 0 && currentIndex < allBlogs.length - 1 ? allBlogs[currentIndex + 1] : null;
  const prevBlog = currentIndex > 0 ? allBlogs[currentIndex - 1] : null;

  const { data: comments = [], isLoading, error, getData } = useGetData();
  const [linkedinShareUrl, setLinkedinShareUrl] = useState('');

  useEffect(() => {
    getData(`/api/Blog/${blogItem.id}/Comments`);
    const url = encodeURIComponent(`${window.location.origin}/blogs/${blogTitle}`);
    setLinkedinShareUrl(`https://www.linkedin.com/shareArticle?mini=true&url=${url}&source=LinkedIn`);
  }, []);

  return (
    <section className="blog__details-area space">
      <div className="container">
        <div className="blog__inner-wrap">
          <div className="row">
            <div className="col-70">
              <div className="blog__details-wrap">
                <div className="blog__details-thumb">
                  <Image
                    width={856}
                    height={600}
                    src={blogItem.image}
                    alt={blogItem.title}
                  />
                </div>
                <div className="blog__details-content">
                  <div className="blog-post-meta">
                    <ul className="list-wrap">
                      <li>{blogItem.date}</li>
                      <li>
                        <a href={`/blogs/category/${blogItem.category.replace(/\s+/g, "-").toLowerCase()}`}>{blogItem.category}</a>
                      </li>
                      <li>
                        <a href={blogItem.authorProfile ?? "#"}>{blogItem.author}</a>
                      </li>
                    </ul>
                  </div>
                  <h2 className="title">{blogItem.title}</h2>
                  <blockquote>
                    <Image
                      width={52}
                      height={32}
                      className="blockquote-icon"
                      src="/assets/img/icon/quote.svg"
                      alt="img"
                    />
                    <p>{blogItem.authorQuote}</p>
                  </blockquote>
                  <p>{blogItem.content.introduction}</p>
                  {blogItem.content.sections.map((section, index) => (
                    <div key={index}>
                      <h3>{section.heading}</h3>
                      <p>{section.content}</p>
                      {section.list && (
                        <ul>
                          {section.list.map((item, idx) => (
                            <li key={idx}>
                              <h4>{item.title}</h4>
                              <p>{item.description}</p>
                            </li>
                          ))}
                        </ul>
                      )}
                      {section.services && (
                        <ul>
                          {section.services.map((service, idx) => (
                            <li key={idx}>
                              <h4>{service.title}</h4>
                              <p>{service.description}</p>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}                  <div className="blog__details-bottom">
                  <div className="row align-items-center">
                    <div className="col-md-7">
                  <div className="post-tags">
                    <ul className="list-wrap">
                      {blogItem.tags.map((tag, i) => (
                        <li key={i}>
                          <a href={`/blogs/tag/${tag.replace(/\s+/g, "-").toLowerCase()}`}>{tag}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  </div>
                  <div className="col-md-5">
                  <div className="post-share">
                    <h5 className="title">Share:</h5>
                    <div className="social-btn style3 justify-content-md-end">
                      {socialMediaLinks.slice(0, 3).map((elm, i) => (
                        <a key={i} href={elm.iconClass === 'fab fa-linkedin' ? linkedinShareUrl : elm.href} target="_blank" rel="noopener noreferrer">
                          <span className="link-effect">
                            <span className="effect-1">
                              <i className={elm.iconClass}></i>
                            </span>
                            <span className="effect-1">
                              <i className={elm.iconClass}></i>
                            </span>
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                    </div>
                  </div>
                    </div>
                  <div className="inner__page-nav mt-20 mb-n1">
                    <a href={prevBlog ? `/blogs/${prevBlog.title.replace(/\s+/g, "-").toLowerCase()}` : ""} className={`nav-btn ${!prevBlog ? "disabled" : ""}`}>
                      <i className="fa fa-arrow-left"></i>
                      <span>Previous Post</span>
                    </a>
                    <a href={nextBlog ? `/blogs/${nextBlog.title.replace(/\s+/g, "-").toLowerCase()}` : ""} className={`nav-btn ${!nextBlog ? "disabled" : ""}`}>
                      <span>Next Post</span>
                      <i className="fa fa-arrow-right"></i>
                    </a>
                  </div>
                </div>
                <div className="blog__avatar-wrap">
                  <div className="blog__avatar-img">
                    <a href="#">
                      <Image
                        width={196}
                        height={180}
                        src={blogItem.authorImage}
                        alt="img"
                      />
                    </a>
                  </div>
                  <div className="blog__avatar-info">
                    <h4 className="name">
                      <a href={blogItem.authorProfile ?? "#"}>{blogItem.author}</a>
                    </h4>
                    <p>{blogItem.authorQuote}</p>
                  </div>
                </div>
                {!isLoading && !error ? <Comments comments={comments} /> : null}
                {isLoading && <p>Loading Comments...</p>}
                {error && <p>Something went wrong. Please try again later.</p>}
                <CommentReply blogId={blogItem.id} />
              </div>
            </div>
            <div className="col-30">
              <aside className="blog__sidebar">
                <BlogSearchbar />
                <Categories />
                <RecentPosts />
                <Tags />
              </aside>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
