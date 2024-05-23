<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comment;
use Exception;


class CommentController extends Controller
{
    public function store(Request $request)
    {
        try {
            $response = Comment::create([
                'post_id' => $request->post_id,
                'comment_body' => $request->comment_body,
                'user_id' => $request->user()->id
            ]);

            $response->load('user');

            return response([
                "status" => "Success",
                "response" => $response
            ]);


        } catch (Exception $e) {
            return response(['message' => $e->getMessage()], 500);

        }
    }

    public function update(Request $request, $id)
    {
        try {
            $comment = Comment::findOrFail($id);
            
            if ($comment->user_id !== auth()->user()->id) {
                return response([
                    "error" => "You are not authorized to update this comment."
                ], 403);
            }
            
            $comment->update([
                'comment_body' => $request->comment_body
            ]);
            
            $updatedComment = Comment::findOrFail($id);
    
            return response([
                "status" => "Success",
                "comment" => $updatedComment
            ]);
        } catch (ModelNotFoundException $e) {
            return response([
                "error" => "Comment not found."
            ], 404);
        } catch (Exception $e) {
            return response([
                "error" => $e->getMessage()
            ], 500);
        }
    }


    public function destroy($id)
    {
        try {
            Comment::destroy($id);
            return response([
                "status" => "Success",
                "response" => "Comment deleted successfully!"
            ]);

        } catch (Exception $e) {
            return response([
                "error" => $e->getMessage()
            ], 500);
        }
    }
}
