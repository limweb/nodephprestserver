<?php
use Illuminate\Database\Capsule\Manager as Capsule;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;


class Member  extends  Model  { 

        protected $table='members';
        protected  $primaryKey='id';
        public $timestamps = true;
        protected $guarded = array('id');
        //protected $fillable = [];
        //protected $hidden = [];
        //protected $connection = '';
        //use SoftDeletingTrait;
        //protected $dates = ['deleted_at'];

        //protected $casts = [
        //     ""       => '',
        //];

        //public static function boot()     {
        //    parent::boot();
        //}

 }

 class App  extends  Model  { 
 
         protected $table='app';
         protected  $primaryKey='id';
         public $timestamps = true;
         //protected $guarded = array('id');
         //protected $fillable = [];
         //protected $hidden = [];
         //protected $connection = '';
         //use SoftDeletingTrait;
         //protected $dates = ['deleted_at'];
 
         //protected $casts = [
         //     ""       => '',
         //];
 
         //public static function boot()     {
         //    parent::boot();
         //}
 
  }


class Job  extends  Model  { 

        protected $table='jobs';
        protected  $primaryKey='id';
        public $timestamps = true;
        //protected $guarded = array('id');
        //protected $fillable = [];
        //protected $hidden = [];
        //protected $connection = '';
        //use SoftDeletingTrait;
        //protected $dates = ['deleted_at'];

        //protected $casts = [
        //     ""       => '',
        //];

        //public static function boot()     {
        //    parent::boot();
        //}

 }

 class Paytype  extends  Model  { 
 
         protected $table='paytypes';
         protected  $primaryKey='id';
         public $timestamps = true;
         //protected $guarded = array('id');
         //protected $fillable = [];
         //protected $hidden = [];
         //protected $connection = '';
         //use SoftDeletingTrait;
         //protected $dates = ['deleted_at'];
 
         //protected $casts = [
         //     ""       => '',
         //];
 
         //public static function boot()     {
         //    parent::boot();
         //}
 
  }


class Lot  extends  Model  { 

        protected $table='lots';
        protected  $primaryKey='id';
        public $timestamps = true;
        //protected $guarded = array('id');
        //protected $fillable = [];
        //protected $hidden = [];
        //protected $connection = '';
        //use SoftDeletingTrait;
        //protected $dates = ['deleted_at'];

        //protected $casts = [
        //     ""       => '',
        //];

        //public static function boot()     {
        //    parent::boot();
        //}

 }


 class Notreceive  extends  Model  { 
 
         protected $table='notreceives';
         protected  $primaryKey='id';
         public $timestamps = true;
         //protected $guarded = array('id');
         //protected $fillable = [];
         //protected $hidden = [];
         //protected $connection = '';
         //use SoftDeletingTrait;
         //protected $dates = ['deleted_at'];
 
         //protected $casts = [
         //     ""       => '',
         //];
 
         //public static function boot()     {
         //    parent::boot();
         //}
 
  }