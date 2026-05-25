<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Inscription extends Model
{
    protected $fillable = ['user_id', 'annonce_id', 'status'];

    public function citoyen(){
        return $this->belongsTo(User::class, 'user_id');
    }

    public function annonce(){
        return $this->belongsTo(Annonce::class);
    }
    public function user(){
    return $this->belongsTo(User::class);
}
}