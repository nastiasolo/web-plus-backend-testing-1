import { Post, PostsService } from "./posts.service";

describe("PostsService", () => {
  let postsService: PostsService;
  const post: Omit<Post, "id" | "date"> = {
    text: "Mocked post",
  };

  beforeEach(async () => {
    postsService = new PostsService();

    postsService.create({ text: "Some pre-existing post" });
  });

  it("should add a new post", () => {
    const createdPost = postsService.create(post);

    expect(createdPost).toHaveProperty("id");
    expect(createdPost).toHaveProperty("date");
    expect(createdPost.text).toBe(post.text);

    const found = postsService["posts"].find((p) => p.id === createdPost.id);
    expect(found).toEqual(createdPost);
  });

  it("should find a post", () => {
    const createdPost = postsService.create(post);
    const foundPost = postsService.find(createdPost.id);

    expect(foundPost).toEqual(createdPost);
  });
});
