// package com.blog.blogapp.controller;

// import com.blog.blogapp.model.Post;
// import com.blog.blogapp.model.User;
// import com.blog.blogapp.repository.PostRepository;
// import com.blog.blogapp.repository.UserRepository;
// import com.blog.blogapp.service.PostService;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.security.core.annotation.AuthenticationPrincipal;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;

// @RestController
// @RequestMapping("/api/posts")
// public class PostController {

//     @Autowired
//     private PostService postService;

//     @Autowired
//     private UserRepository userRepository;

//     @Autowired
//     private PostRepository postRepository;

//     // Allow public access to all posts
//     @GetMapping
//     public List<Post> getAllPosts() {
//         return postService.getAllPosts();
//     }

//     // Allow public access to view a single post by its ID
//     @GetMapping("/{id}")
//     public ResponseEntity<Post> getPostById(@PathVariable Long id) {
//         return postService.getAllPosts().stream()
//                 .filter(post -> post.getId().equals(id))
//                 .findFirst()
//                 .map(ResponseEntity::ok)
//                 .orElse(ResponseEntity.notFound().build());
//     }

//     // Allow only authenticated users to create posts
//     @PostMapping
//     public ResponseEntity<String> createPost(@RequestBody Post post, @AuthenticationPrincipal UserDetails userDetails) {
//         // Get the authenticated user from the session
//         User user = userRepository.findByUsername(userDetails.getUsername());

//         if (user == null) {
//             return ResponseEntity.badRequest().body("User not found");
//         }

//         // Set the user to the post and save
//         post.setUser(user);
//         postService.createPost(post);

//         return ResponseEntity.ok("Post created successfully");
//     }

//     // Allow only authenticated users to update their posts
//     @PutMapping("/{id}")
//     public ResponseEntity<? extends Object> updatePost(@PathVariable Long id, @RequestBody Post updatedPost,
//             @AuthenticationPrincipal UserDetails userDetails) {
//         return postRepository.findById(id)
//                 .map(post -> {
//                     // Ensure the authenticated user is the owner of the post
//                     if (!post.getUser().getUsername().equals(userDetails.getUsername())) {
//                         return ResponseEntity.status(403).body(null); // Forbidden if not the owner
//                     }

//                     post.setTitle(updatedPost.getTitle());
//                     post.setContent(updatedPost.getContent());
//                     return ResponseEntity.ok(postRepository.save(post));
//                 })
//                 .orElse(ResponseEntity.notFound().build());
//     }

//     // Allow only authenticated users to delete their posts
//     @DeleteMapping("/{id}")
//     public ResponseEntity<Object> deletePost(@PathVariable Long id, @AuthenticationPrincipal UserDetails userDetails) {
//         return postRepository.findById(id)
//                 .map(post -> {
//                     // Ensure the authenticated user is the owner of the post
//                     if (!post.getUser().getUsername().equals(userDetails.getUsername())) {
//                         return ResponseEntity.status(403).build(); // Forbidden if not the owner
//                     }

//                     postRepository.deleteById(id);
//                     return ResponseEntity.noContent().build();
//                 })
//                 .orElse(ResponseEntity.notFound().build());
//     }
// }
package com.blog.blogapp.controller;

import com.blog.blogapp.model.Post;
import com.blog.blogapp.model.User;
import com.blog.blogapp.repository.PostRepository;
import com.blog.blogapp.repository.UserRepository;
import com.blog.blogapp.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
// import org.springframework.security.core.annotation.AuthenticationPrincipal;
// import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostService postService;

    @Autowired
    private PostRepository postRepository;
    @Autowired
    private UserRepository userRepository;

    // Get all posts (Public Access)
    @GetMapping
    public List<Post> getAllPosts() {
        return postService.getAllPosts();
    }

    // Get a single post by ID (Public Access)
    @GetMapping("/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable Long id) {
        Optional<Post> post = postRepository.findById(id);
        return post.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // Create a new post (Authenticated Users Only)
    // @PostMapping
    // public ResponseEntity<String> createPost(@RequestBody Post post) {
    // postService.createPost(post);
    // return ResponseEntity.ok("Post created successfully");
    // }
    // @PostMapping
    // public ResponseEntity<String> createPost(@RequestBody Map<String, Object>
    // postData) {
    // try {
    // // Extract userId from request data
    // Long userId = Long.valueOf(postData.get("userId").toString());
    // String title = postData.get("title").toString();
    // String content = postData.get("content").toString();

    // // Find user in the database
    // User user = userRepository.findById(userId).orElse(null);
    // if (user == null) {
    // return ResponseEntity.badRequest().body("User not found");
    // }

    // // Create a new post and associate it with the user
    // Post post = new Post();
    // post.setTitle(title);
    // post.setContent(content);
    // post.setUser(user);

    // postService.createPost(post);
    // return ResponseEntity.ok("Post created successfully");

    // } catch (Exception e) {
    // return ResponseEntity.badRequest().body("Invalid request: " +
    // e.getMessage());
    // }
    // }
    @PostMapping
    public ResponseEntity<String> createPost(@RequestBody Map<String, Object> postData) {
        try {
            System.out.println("Received Data: " + postData); // Debugging log

            // Extract userId from request
            if (!postData.containsKey("userId")) {
                return ResponseEntity.badRequest().body("User ID is required");
            }

            Long userId = Long.valueOf(postData.get("userId").toString());
            String title = postData.get("title").toString();
            String content = postData.get("content").toString();

            // Find user in the database
            User user = userRepository.findById(userId).orElse(null);
            if (user == null) {
                return ResponseEntity.badRequest().body("User not found");
            }

            // Create and save the post
            Post post = new Post();
            post.setTitle(title);
            post.setContent(content);
            post.setUser(user);

            postService.createPost(post);
            return ResponseEntity.ok("Post created successfully");

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error creating post: " + e.getMessage());
        }
    }

    // Update any post (Authenticated Users Only)
    @PutMapping("/{id}")
    public ResponseEntity<Post> updatePost(@PathVariable Long id, @RequestBody Post updatedPost) {
        return postRepository.findById(id)
                .map(post -> {
                    post.setTitle(updatedPost.getTitle());
                    post.setContent(updatedPost.getContent());
                    return ResponseEntity.ok(postRepository.save(post));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Delete any post (Authenticated Users Only)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        if (!postRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        postRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
