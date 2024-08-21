<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;


class postController extends Controller
{
    public function add_post(Request $request)
    {
        $request->validate([
            'files.*' => 'required|image',
            'desc' => 'required|max:150',
            'title' => 'required',
        ]);

        $post = new Post();
        $post->title = $request->title;
        $post->desc = $request->desc;
        dd($request->file('files'));
        $filePaths = [];
        if ($request->hasFile('files')) {
            foreach ($request->file('files') as $file) {
                $path = $file->store('post');
                $filePaths[] = $path;
            }
        }

        $post->post_path = json_encode($filePaths);

        $post->save();

        return response()->json(['message' => 'Post added successfully!'], 201);
    }


}
