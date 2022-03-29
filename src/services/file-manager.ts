import { open, appendFile, close } from 'fs';

export const writeFile = async (filePath: string, content: string) => {
    open(filePath, 'utf-8', (err, fd) => {
        if (err) throw err;
        try {
            appendFile(fd, content, 'utf-8', err => {
                if (err) throw err;
                close(fd);
            });
        } catch (err: any) {
            console.log(err.message);
        }
    });
};

export const readFile = async () => {};

export const trimFile = async () => {};
