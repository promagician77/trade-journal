import {rm,mkdir,cp,copyFile} from 'node:fs/promises';
await rm('dist',{recursive:true,force:true});await mkdir('dist');
for(const file of ['index.html','style.css'])await copyFile(file,`dist/${file}`);
await cp('src','dist/src',{recursive:true});console.log('Static site built in dist. No server functions.');
