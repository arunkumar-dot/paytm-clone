export function Balance({amount}){
    return <div className="flex">
        <div className="font-bold text-lg ml-4">
            Your Balance
        </div>
        <div className="font-semibold ml-4 text-lg">
           Rs {amount}
        </div>
    </div>
}