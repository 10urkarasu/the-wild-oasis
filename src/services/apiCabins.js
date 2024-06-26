import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
    const { data: cabins, error } = await supabase.from("cabins").select("*");
    if (error) {
        console.error(error);
        throw new Error("Cabins could not be loaded");
    }
    return cabins;
}

export async function createCabin(newCabin) {
    const imageName = `${Date.now()}-${Math.random()}-${
        newCabin.image.name
    }`.replaceAll("/", "");
    const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
    const { data, error } = await supabase
        .from("cabins")
        .insert([{ ...newCabin, image: imagePath }])
        .select();
    if (error) {
        console.error(error);
        throw new Error("Cabins could not be deleted");
    }

    const { error: storageError } = await supabase.storage
        .from("cabin-images")
        .upload(imageName, newCabin.image);

    if (storageError) {
        await await supabase.from("cabins").delete().eq("id", data.id);
        throw new Error(
            "Cabin image could not be uploaded and the cabin was not created"
        );
    }

    return data;
}

export async function deleteCabin(id) {
    const { error, cabins } = await supabase
        .from("cabins")
        .delete()
        .eq("id", id);

    if (error) {
        console.error(error);
        throw new Error("Cabins could not be deleted");
    }
    return cabins;
}
