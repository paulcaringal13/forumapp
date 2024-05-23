<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('posts')->insert([
            [
                'title' => 'First post',
                'body' => 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae dolore culpa doloremque quo laboriosam aspernatur?',
                'user_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Second Post',
                'body' => 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt, eaque laudantium. Dicta eius minima repellendus, porro adipisci nulla maiores facere in, nobis dolorem neque quaerat.',
                'user_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
