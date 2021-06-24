import { getCustomRepository } from "typeorm"
import { TagsRepositories } from "../repositories/TagsRepositories"

class CreateTagService {

      async execute(name: string){

            const tagsRepositories = getCustomRepository(TagsRepositories);

            //Verificar se o nome está preenchido
            if(!name){
              throw new Error("Incorrect name!");
            }


            //SELECT * FROM TAGS WHERE NAME = 'name' (Verificando se a tag já existe)
            const tagAlreadyExists = await tagsRepositories.findOne({
              name
            });

            //Se a tag já existir, mostrar o erro
            if(tagAlreadyExists){
              throw new Error("Tag already exists!");
            }

            //Caso esteja tudo certo, a tag será salva
            const tag = tagsRepositories.create({
              name
            });

            await tagsRepositories.save(tag);
            return tag;


      }

}
export{ CreateTagService }