(module
    (import "js" "mem" (memory 1))
    (data (i32.const 0) "Hi")
    (start $init)
    (func $init
        i32.const 1
        i32.const 10
        i32.store)
    (func $add (param $a i32) (param $b i32) (result i32)
        (i32.add (local.get $a) (local.get $b)))
    (export "add" (func $add))
    
    (func $store (export "store") (param $offset i32) (param $value i32)
        local.get $offset
        local.get $value
        i32.store8)
        
    (func $search (export "search") 
        (param $dataOffset i32) (param $dataLen i32) (param $strOffset i32) (param $strLen i32) (result i32)
        (local $i i32) (local $j i32)
        block $main (result i32)
            loop $iter (result i32)
                ;; if i == dataLen return
                local.get $i
                local.get $dataLen
                i32.eq
                if 
                    i32.const -1
                    br $main
                end

                ;; load data[i + j]
                local.get $i
                local.get $dataOffset
                i32.add
                local.get $j
                i32.add
                i32.load8_u

                ;; load str[j]
                local.get $j
                local.get $strOffset
                i32.add
                i32.load8_u

                ;; data[i] == str[j]
                i32.eq
                if
                    ;; j++
                    local.get $j
                    i32.const 1
                    i32.add
                    local.set $j

                    ;; j == strLen
                    local.get $j
                    local.get $strLen
                    i32.eq
                    if ;; end
                        local.get $i
                        br $main
                    else ;; next inner loop itration
                        br $iter
                    end

                else 
                    i32.const 0
                    local.set $j
                    local.get $i
                    i32.const 1
                    i32.add
                    local.set $i
                    br $iter
                end
                local.get $i
            end
        end
    )
)
