import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import Link from "next/link";

function DocumentRow({ id ,date, title, onDelete }) {
  return (
    <Link href={`/doc/${id}`}>
    <a>
        <div className="flex items-center p-4 rounded-lg hover:bg-gray-100 text-sm cursor-pointer">
          <Icon name="article" size="3xl" color="blue" />
          <p className="flex-grow pl-5 w-10 pr-10 truncate">{title}</p>
          <p className="pr-5 text-sm">{date.slice(0,10)}</p>

          <Button
            color="gray"
            buttonType="outline"
            rounded={true}
            iconOnly={true}
            ripple="dark"
            onClick={(event) => {
                event.preventDefault();
                onDelete(id);
              }}
            className="border-0 z-50"
           
          >
            <Icon name="delete" size="3xl" color="red" />
          </Button>
        </div>
      </a>
    </Link>
      
   
  );
}

export default DocumentRow;