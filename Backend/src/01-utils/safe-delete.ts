import fs from 'fs';

function safeDelete(absolutePath: string): void {

    try {
        if(!absolutePath) return;

        if(fs.existsSync(absolutePath)){ 
            
            fs.unlinkSync(absolutePath); 
        }
    }
    catch(err: any) { 
        console.error(err);
    }

}

export default safeDelete;