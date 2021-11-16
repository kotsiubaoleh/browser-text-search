(module
  (type (;0;) (func))
  (type (;1;) (func (param i32 i32) (result i32)))
  (type (;2;) (func (param i32 i32)))
  (type (;3;) (func (param i32 i32 i32 i32) (result i32)))
  (import "js" "mem" (memory (;0;) 1))
  (func (;0;) (type 0)
    i32.const 1
    i32.const 10
    i32.store)
  (func (;1;) (type 1) (param i32 i32) (result i32)
    local.get 0
    local.get 1
    i32.add)
  (func (;2;) (type 2) (param i32 i32)
    local.get 0
    local.get 1
    i32.store8)
  (func (;3;) (type 3) (param i32 i32 i32 i32) (result i32)
    (local i32 i32)
    block (result i32)  ;; label = @1
      loop (result i32)  ;; label = @2
        local.get 4
        local.get 1
        i32.eq
        if  ;; label = @3
          i32.const -1
          br 2 (;@1;)
        end
        local.get 4
        local.get 0
        i32.add
        local.get 5
        i32.add
        i32.load8_u
        local.get 5
        local.get 2
        i32.add
        i32.load8_u
        i32.eq
        if  ;; label = @3
          local.get 5
          i32.const 1
          i32.add
          local.set 5
          local.get 5
          local.get 3
          i32.eq
          if  ;; label = @4
            local.get 4
            br 3 (;@1;)
          else
            br 2 (;@2;)
          end
        else
          i32.const 0
          local.set 5
          local.get 4
          i32.const 1
          i32.add
          local.set 4
          br 1 (;@2;)
        end
        local.get 4
      end
    end)
  (export "add" (func 1))
  (export "store" (func 2))
  (export "search" (func 3))
  (start 0)
  (data (;0;) (i32.const 0) "Hi"))
