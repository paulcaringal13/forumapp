<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Exception;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $posts = Post::with('comments', 'comments.user', 'user')->orderBy('created_at', 'desc')->get();
            
            return response([
                "posts" => $posts
            ], 200);
        } catch (Exception $e) {
            return response([
                "error" => $e->getMessage()
            ], 500);
        }
    }



    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            // Create the post and associate the user
            $post = Post::create([
                'title' => $request->title,
                'body' => $request->content,
                'user_id' => $request->user()->id,
            ]);

            // Reload the post with the user relationship
            $post->load('user');

            return response([
                "status" => "Success",
                "post" => $post
            ], 201); // HTTP status code 201 for resource creation success

        } catch (Exception $e) {
            return response([
                "error" => $e->getMessage(),
                "user" => $request->user()->id
            ], 500);
        }
    }

    public function show(Request $request)
    {
        try {
            $myPosts = Post::where('user_id', $request->user()->id)->get();

            $myPosts->load('user', 'comments', 'comments.user');
            return response([
                "status" => "Success",
                "response" => $myPosts
            ]);
        } catch (Exception $e) {
            return response([
                "error" => $e->getMessage()
            ], 500);
        }
    }


    public function getSelectedPost($id)
    {
        // Retrieve the post with comments and user using eager loading
        $post = Post::with('comments.user', 'user')->findOrFail($id);

        return response()->json($post);
    }

    public function update(Request $request, $id)
    {
        try {
            $post = Post::findOrFail($id);
            $update = $post->update([
                'title' => $request->postTitle,
                'body' => $request->postBody
            ]);

            return response([
                "status" => "Success",
                "response" => $update
            ]);
        } catch (Exception $e) {
            return response([
                "error" => $e->getMessage()
            ], 500);
        }
    }


    public function destroy($id)
    {
        try {
            Post::destroy($id);
            return response([
                "status" => "Success",
                "response" => "Post deleted successfully!   "
            ]);

        } catch (Exception $e) {
            return response([
                "error" => $e->getMessage()
            ], 500);
        }
    }
}
