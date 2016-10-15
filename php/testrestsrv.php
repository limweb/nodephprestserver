<?php
require_once __DIR__.'/vendor/autoload.php';
require_once __DIR__ . '/./libs/RestfulServer.php';
require_once __DIR__.'/TestController.php';

$server = new RestfulServer('debug');
$server->addClass('TestController','/');
$server->addClass('TestController','/aaa');
// dump($server);
$server->handle();
// echo '<style>pre.sf-dump{display:block;padding:5px;background-color:#18171B;color:#FF8400;line-height:1.2em;font:12px Menlo,Monaco,Consolas,monospace;word-wrap:break-word;white-space:pre-wrap;position:relative;z-index:100000}pre.sf-dump span{display:inline}pre.sf-dump .sf-dump-compact{display:none}pre.sf-dump abbr{text-decoration:none;border:none;cursor:help}pre.sf-dump a{text-decoration:none;cursor:pointer;border:0;outline:0}pre.sf-dump .sf-dump-num{font-weight:700;color:#1299DA}pre.sf-dump .sf-dump-const{font-weight:700}pre.sf-dump .sf-dump-str{font-weight:700;color:#56DB3A}pre.sf-dump .sf-dump-note{color:#1299DA}pre.sf-dump .sf-dump-ref{color:#A0A0A0}pre.sf-dump .sf-dump-private,pre.sf-dump .sf-dump-protected,pre.sf-dump .sf-dump-public{color:#FFF}pre.sf-dump .sf-dump-meta{color:#B729D9}pre.sf-dump .sf-dump-key{color:#56DB3A}pre.sf-dump .sf-dump-index{color:#1299DA}</style>';
// interface animal {
// 	function breath();
// 	function eat();
// }

// abstract class Foo {
// 	public function abc() {
// 		 echo __CLASS__,"\n";
// 	}
// }

// class testChild extends Foo
// {
// 	public function xyz()
// 	{
// 		 echo __CLASS__,"\n";
// 	}
// }
// $a = new testChild();

// if( $a instanceof Foo){
// 	echo 'y',"\n";
// 	$a->abc();
// 	$a->xyz();
// }

// var_dump($a instanceof Foo);