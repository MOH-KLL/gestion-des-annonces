<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Annonce extends Model
{
    protected $guarded = [];

    public function annonceur(){
        return $this->belongsTo(User::class, 'user_id');
    }

    public function inscriptions(){
        return $this->hasMany(Inscription::class);
    }
}